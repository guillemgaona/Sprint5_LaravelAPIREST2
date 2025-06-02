<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSetRequest extends FormRequest
{

    public function authorize(): bool
    {

        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'exercise_id' => 'required|exists:exercises,id',
            'set_number' => 'required|integer|min:1',
            'repetitions' => 'required|integer|min:0', 
            'weight' => 'required|numeric|min:0',
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array
     */
    public function messages(): array
    {
        return [
            'exercise_id.required' => 'Debes seleccionar un ejercicio.',
            'exercise_id.exists' => 'El ejercicio seleccionado no es válido.',
            'set_number.required' => 'El número de serie es obligatorio.',
            'set_number.integer' => 'El número de serie debe ser un entero.',
            'set_number.min' => 'El número de serie debe ser como mínimo 1.',
            'repetitions.required' => 'El número de repeticiones es obligatorio.',
            'repetitions.integer' => 'Las repeticiones deben ser un número entero.',
            'repetitions.min' => 'Las repeticiones deben ser como mínimo 0.',
            'weight.required' => 'El peso es obligatorio.',
            'weight.numeric' => 'El peso debe ser un valor numérico.',
            'weight.min' => 'El peso debe ser como mínimo 0.',
        ];
    }
}