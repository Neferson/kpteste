<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductFormValidator extends FormRequest
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
            'name' => 'required',
            'category_id' => 'required',
            'measurement' => 'required|in:unidade,kg'
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Este campo é de preenchimento obrigatório!',
            'category_id.required'  => 'Este campo é de preenchimento obrigatório!',
            'measurement.required'  => 'Escolha uma das opções!',
            'measurement.in'  => 'Escolha uma das opções!'
        ];
    }
}
