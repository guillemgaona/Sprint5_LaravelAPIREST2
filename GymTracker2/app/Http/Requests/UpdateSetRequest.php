<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSetRequest extends FormRequest
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
            'exercise_id' => 'sometimes|required|exists:exercises,id',
            'set_number' => 'sometimes|required|integer|min:1',
            'repetitions' => 'sometimes|required|integer|min:0',
            'weight' => 'sometimes|required|numeric|min:0',
        ];
    }

    public function messages(): array
    {
        return [
            'exercise_id.required' => 'Si proporcionas un ejercicio, este es obligatorio.',
            'exercise_id.exists' => 'El ejercicio seleccionado no es válido.',
            'set_number.required' => 'Si proporcionas un número de serie, este es obligatorio.',
            'set_number.integer' => 'El número de serie debe ser un entero.',
            'set_number.min' => 'El número de serie debe ser como mínimo 1.',
            'repetitions.required' => 'Si proporcionas repeticiones, estas son obligatorias.',
            'repetitions.integer' => 'Las repeticiones deben ser un número entero.',
            'repetitions.min' => 'Las repeticiones deben ser como mínimo 0.',
            'weight.required' => 'Si proporcionas un peso, este es obligatorio.',
            'weight.numeric' => 'El peso debe ser un valor numérico.',
            'weight.min' => 'El peso debe ser como mínimo 0.',
        ];
    }
}