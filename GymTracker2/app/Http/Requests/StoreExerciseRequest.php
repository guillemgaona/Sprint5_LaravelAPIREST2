<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreExerciseRequest extends FormRequest
{
    
    public function authorize(): bool
    {

        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:100|unique:exercises,name',
            'muscle_group' => [
                'required',
                'string',
                Rule::in(['chest', 'back', 'legs', 'shoulders', 'arms', 'core', 'other']),
            ],
            'description' => 'nullable|string|max:1000',
            'demo_image_url' => 'nullable|url|max:255',
        ];
    }

   
    public function messages(): array
    {
        return [
            'name.required' => 'El nombre del ejercicio es obligatorio.',
            'name.unique' => 'Ya existe un ejercicio con este nombre.',
            'muscle_group.required' => 'El grupo muscular es obligatorio.',
            'muscle_group.in' => 'El grupo muscular seleccionado no es válido.',
            'demo_image_url.url' => 'La URL de la imagen de demostración no es válida.',
        ];
    }
}