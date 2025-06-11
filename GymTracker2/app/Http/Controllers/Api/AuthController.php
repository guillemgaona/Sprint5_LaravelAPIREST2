<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\UserResource;
use Spatie\Permission\Models\Role;
use Carbon\Carbon;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:50|unique:users',
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::create([
            'username' => $request->username,
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);


        $userRole = Role::firstOrCreate(['name' => 'user', 'guard_name' => 'api']);
        $user->assignRole($userRole);

        return response()->json([
            'message' => 'User registered successfully!',
            'user' => new UserResource($user)
        ], 201);
    }

    public function login(Request $request)
    {
        
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
 
        $user = User::where('email', $request->email)->first();
        
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['error' => 'Unauthenticated'], 401);
        }

        $tokenResult = $user->createToken('Personal Access Token');

        return response()->json([
            'message' => 'Login successful!',
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'user' => new UserResource($user)
        ], 200);
    }

    public function logout(Request $request)
    {
        $user = $request->user();

        if ($user && $user->tokens()) {
            $user->tokens()->delete();
            return response()->json(['message' => 'Successfully logged out']);
        }
        return response()->json(['error' => 'Unauthenticated'], 401);
    }

    public function user(Request $request)
    {
        return new UserResource($request->user());
    }
}
