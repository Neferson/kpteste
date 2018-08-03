<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PaymentMethodFormValidator extends FormRequest
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
            'title' => 'required',
            'payment_service_id' => 'required',
            'payment_pointer' => 'required',
            'payment_day' => 'required'
        ];
    }


    public function messages()
    {
        return [
            'title.required' => 'Este campo é de preenchimento obrigatório.',
            'payment_service_id.required' => 'Escolha uma das opções.',
            'payment_pointer.required' => 'Escolha uma das opções.',
            'payment_day.required' => 'Este campo é de preenchimento obrigatório.'
        ];
    }
}
