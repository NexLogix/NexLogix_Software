<?php
namespace App\UseCases\Envios;

use App\Models\CategoriaEnvio;
use App\Models\Entregas;
use App\Models\Envios;
use App\Models\Interfaces\Envios\IEnviosService;
use App\Models\Interfaces\Envios\IEnviosUseCase;
use App\Models\Recogidas;
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
        // 1) Validacion de datos
        $validator = Validator::make($data, [
            'nombreRemitente'          => 'required|string|max:255',
            'num_ContactoRemitente'    => 'required|string|max:14|regex:/^[0-9+]+$/',
            'nombreDestinatario'       => 'required|string|max:255',
            'num_ContactoDestinatario' => 'required|string|max:14|regex:/^[0-9+]+$/',
            'metodoPago'               => 'required|in:Efectivo,Tarjeta Debito,Tarjeta Credito,Plataformas Virtuales,Cupones',
            'idRecogida'               => 'required|exists:recogidas,idRecogida',
            'idEntrega'                => 'required|exists:entregas,idEntrega',
            'idCategoria'              => 'required|exists:categoriaenvios,idCategoria',
        ]);
        // 2) Si algo falla, mostrara el porque
        if ($validator->fails()) {
            return [
                'success' => false,
                'message' => 'Errores de validación',
                'errors' => $validator->errors(),
                'status' => 422
            ];
        }
        // 3) Validacion de datos
        $validatedData = $validator->validated();

        // 4) Obtener entidades relacionadas
        $recogida = Recogidas::findOrFail($validatedData['idRecogida']);
        $entrega = Entregas::findOrFail($validatedData['idEntrega']);
        $categoria_envio = CategoriaEnvio::findOrFail($validatedData['idCategoria']);

        // 5) Calcular costos
        $costo_Recogida = $recogida->ciudades->costoPor_Ciudad;
        $costo_Entrega = $entrega->ciudades->costoPor_Ciudad;
        $costo_Categoria = $categoria_envio->precioCategoria;

        $costo_base = $costo_Recogida + $costo_Entrega + $costo_Categoria;

        $costo_total = round($costo_base * 1.12, 2); // +12% IVA

        $validatedData['costosTotal_Envio'] = $costo_total; // se define el costo total del envio
        $validatedData['fechaEnvio'] = now(); // para poner fecha
        $validatedData['idusuarios'] = Auth::id(); // se asigna automaticamente el id del usuario auteticado gracias JWT

        return $this->envio_service->createEnvio($validatedData);
    }

    // use case de PUT // no recomendable de usar
    public function handleUpdateEnvio(int $id, array $data): array
    {
        $validator = Validator::make($data, [
            'nombreRemitente'          => 'required|string|max:255',
            'num_ContactoRemitente'    => 'required|string|max:14|regex:/^[0-9+]+$/',
            'nombreDestinatario'       => 'required|string|max:255',
            'num_ContactoDestinatario' => 'required|string|max:14|regex:/^[0-9+]+$/',
            'metodoPago'               => 'required|in:Efectivo,Tarjeta Debito,Tarjeta Credito,Plataformas Virtuales,Cupones',
            'costosTotal_Envio'        => 'required|numeric|min:0',
            'idRecogida'               => 'required|exists:recogidas,idRecogida',
            'idEntrega'                => 'required|exists:entregas,idEntrega',
            'idCategoria'              => 'required|exists:categoriaenvios,idCategoria',
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

        // Recalcular costos
        $recogida = Recogidas::findOrFail($validatedData['idRecogida']);
        $entrega = Entregas::findOrFail($validatedData['idEntrega']);
        $categoria_envio = CategoriaEnvio::findOrFail($validatedData['idCategoria']);

        $costo_Recogida = $recogida->ciudades->costoPor_Ciudad;
        $costo_Entrega = $entrega->ciudades->costoPor_Ciudad;
        $costo_Categoria = $categoria_envio->precioCategoria;

        $costo_base = $costo_Recogida + $costo_Entrega + $costo_Categoria;
        $validatedData['costosTotal_Envio'] = round($costo_base * 1.12, 2);

        return $this->envio_service->updateEnvio($id, $validator->validated());
    }

    // usecase de PATCH
    public function handleUpdateSpecificSection(int $id, array $data): array
    {
        $validator = Validator::make($data, [
            'nombreRemitente'          => 'sometimes|string|max:255',
            'num_ContactoRemitente'    => 'sometimes|string|max:14|regex:/^[0-9+]+$/',
            'nombreDestinatario'       => 'sometimes|string|max:255',
            'num_ContactoDestinatario' => 'sometimes|string|max:14|regex:/^[0-9+]+$/',
            'metodoPago'               => 'sometimes|in:Efectivo,Tarjeta Debito,Tarjeta Credito,Plataformas Virtuales,Cupones',
            'costosTotal_Envio'        => 'sometimes|numeric|min:0',
            'idRecogida'               => 'sometimes|exists:recogidas,idRecogida',
            'idEntrega'                => 'sometimes|exists:entregas,idEntrega',
            'idCategoria'              => 'sometimes|exists:categoriaenvios,idCategoria',
        ]);

        if ($validator->fails()) {
            return [
                'success' => false,
                'message' => 'Errores de validación',
                'errors' => $validator->errors(),
                'status' => 422
            ];
        }

        $validatedData = $validator->validated(); // valida los datos
        $envioActual = Envios::findOrFail($id); // busca el id del envio que se esta actualizando

        if (isset($validatedData['idRecogida']) || isset($validatedData['idEntrega']) || isset($validatedData['idCategoria'])) {
            $recogida = Recogidas::findOrFail($validatedData['idRecogida'] ?? $envioActual->idRecogida);
            $entrega = Entregas::findOrFail($validatedData['idEntrega'] ?? $envioActual->idEntrega);
            $categoria_envio = CategoriaEnvio::findOrFail($validatedData['idCategoria'] ?? $envioActual->idCategoria);

            $costo_Recogida = $recogida->ciudades->costoPor_Ciudad;
            $costo_Entrega = $entrega->ciudades->costoPor_Ciudad;
            $costo_Categoria = $categoria_envio->precioCategoria;

            $costo_base = $costo_Recogida + $costo_Entrega + $costo_Categoria;
            $validatedData['costosTotal_Envio'] = round($costo_base * 1.12, 2);
        }

        return $this->envio_service->updateSpecificSection($id, $validator->validated());
    }
}