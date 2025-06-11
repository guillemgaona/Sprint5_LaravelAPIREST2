<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTrainingSessionRequest extends FormRequest
{

    public function authorize(): bool
    {

        return true;
    }


    public function rules(): array
    {
        return [
            'date' => 'sometimes|required|date_format:Y-m-d',
            'notes' => 'sometimes|nullable|string|max:2000',
        ];
    }


    public function messages(): array
    {
        return [
            'date.required' => 'Si proporcionas una fecha, esta es obligatoria.',
            'date.date_format' => 'La fecha debe tener el formato AAAA-MM-DD.',
            'notes.string' => 'Las notas deben ser una cadena de texto.',
            'notes.max' => 'Las notas no pueden exceder los 2000 caracteres.',
        ];
    }
}