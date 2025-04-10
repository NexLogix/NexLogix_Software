<?php
namespace App\UseCases\Users;

use App\Services\Users\UserService;

use Illuminate\Support\Facades\Validator;


class UserUseCase
{
    /*Variable $serviceU, es la llamade del service de usuarios, en vez de importarla a cada rato, se denomina la
    variable $serviceU para trabajo mas rapido*/
    protected $serviceU;

    // Herecia del serviceUser a Usecase
    public function __construct(UserService $serviceU)
    {
        $this->serviceU = $serviceU;
    }

    // POST USE CASE
    public function handleCreateUser(array $data): array
    {
        $validator = Validator::make($data, [
            'documentoIdentidad'  => 'required|string|max:50|unique:usuarios,documentoIdentidad',
            'nombreCompleto'      => 'required|string|max:255',
            'email'               => 'required|email|unique:usuarios,email',
            'numContacto'         => 'required|string|max:20',
            'direccionResidencia' => 'required|string',
            'contrasena'          => 'required|string|min:6',
            'idestado'            => 'required|exists:estado,idestado',
            'idRole'              => 'required|exists:roles,idRole',
            'idPuestos'           => 'required|exists:puestos,idPuestos',
        ]);

        if ($validator->fails()) {
            return [
                "success" => false,
                "message" => "Errores de validación",
                "errors"  => $validator->errors(),
                "status"  => 422
            ];
        }

        return $this->serviceU->createUser($validator->validated());
    }

/* NOTA:
    Tanto en put y en patch no se cambia la contrasena, no se puede hacer aqui, ese metodo estara
    en AUTH */

    // PUT USE CASE

}
