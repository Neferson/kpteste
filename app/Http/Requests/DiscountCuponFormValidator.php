<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DiscountCuponFormValidator extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            //
            'name' => 'required',
            'code' => 'required',
            'type' => 'required',
            'value' => 'required'
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Este campo é de preenchimento obrigatório.',
            'code.required' => 'Este campo é de preenchimento obrigatório.',
            'type.required' => 'Escolha uma das opções.',
            'value.required' => 'Este campo é de preenchimento obrigatório.'
        ];
    }
}
