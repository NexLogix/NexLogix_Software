<?php
namespace App\UseCases\Envios;

use App\Models\Interfaces\Envios\IEnviosService;
use App\Models\Interfaces\Envios\IEnviosUseCase;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class EnvioUseCase implements IEnviosUseCase

{
    protected IEnviosService $envio_service;

    public function __construct(IEnviosService $envio_service)
    {
        $this->envio_service = $envio_service;
    }

    // usecase de POST
    public function handleCreateEnvio(array $data): array
    {
        $validator = Validator::make($data, [
            'nombreRemitente' => 'required|string|max:255',
            'num_ContactoRemitente' => 'required|string|max:14|regex:/^[0-9+]+$/',
            'nombreDestinatario' => 'required|string|max:255',
            'num_ContactoDestinatario' => 'required|string|max:14|regex:/^[0-9+]+$/',
            'metodoPago' => 'required|in:Efectivo,Tarjeta Debito,Tarjeta Credito,Plataformas Virtuales,Cupones',
            'costosTotal_Envio' => 'required|numeric|min:0',
            'idRecogida' => 'required|exists:recogidas,idRecogida',
            'idEntrega' => 'required|exists:entregas,idEntrega',
        ]);

        if ($validator->fails()) {
            return [
                'success' => false,
                'message' => 'Errores de validación',
                'errors' => $validator->errors(),
                'status' => 422
            ];
        }

        $validatedData = $validator->validated();
        $validatedData['fechaEnvio'] = now(); // para poner fecha   
        $validatedData['idusuarios'] = Auth::id(); // se asigna automaticamente el id del usuario auteticado gracias JWT

        return $this->envio_service->createEnvio($validatedData);
    }

    // use case de PUT
    public function handleUpdateEnvio(int $id, array $data): array
    {
        $validator = Validator::make($data, [
            'nombreRemitente' => 'required|string|max:255',
            'num_ContactoRemitente' => 'required|string|max:14|regex:/^[0-9+]+$/',
            'nombreDestinatario' => 'required|string|max:255',
            'num_ContactoDestinatario' => 'required|string|max:14|regex:/^[0-9+]+$/',
            'metodoPago' => 'required|in:Efectivo,Tarjeta Debito,Tarjeta Credito,Plataformas Virtuales,Cupones',
            'costosTotal_Envio' => 'required|numeric|min:0',
            'idRecogida' => 'required|exists:recogidas,idRecogida',
            'idEntrega' => 'required|exists:entregas,idEntrega',
        ]);

        if ($validator->fails()) {
            return [
                'success' => false,
                'message' => 'Errores de validación',
                'errors' => $validator->errors(),
                'status' => 422
            ];
        }
        return $this->envio_service->updateEnvio($id, $validator->validated());
    }

    // usecase de PATCH
    public function handleUpdateSpecificSection(int $id, array $data): array
    {
        $validator = Validator::make($data, [
            'nombreRemitente' => 'sometimes|string|max:255',
            'num_ContactoRemitente' => 'sometimes|string|max:14|regex:/^[0-9+]+$/',
            'nombreDestinatario' => 'sometimes|string|max:255',
            'num_ContactoDestinatario' => 'sometimes|string|max:14|regex:/^[0-9+]+$/',
            'metodoPago' => 'required|in:Efectivo,Tarjeta Debito,Tarjeta Credito,Plataformas Virtuales,Cupones',
            'costosTotal_Envio' => 'sometimes|numeric|min:0',
            'idRecogida' => 'sometimes|exists:recogidas,idRecogida',
            'idEntrega' => 'sometimes|exists:entregas,idEntrega',
        ]);

        if ($validator->fails()) {
            return [
                'success' => false,
                'message' => 'Errores de validación',
                'errors' => $validator->errors(),
                'status' => 422
            ];
        }

        return $this->envio_service->updateSpecificSection($id, $validator->validated());
    }
}
