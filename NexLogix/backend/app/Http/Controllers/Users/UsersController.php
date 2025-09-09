<?php

namespace App\Http\Controllers\Users;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Automatization\Events\ResourceAction;
use App\Http\Controllers\Controller;
use App\Models\Interfaces\Users\IUserService;
use App\Models\Interfaces\Users\IUserUseCase;

class UsersController extends Controller
{
    protected $userService;
    protected $userUseCase;

    public function __construct(IUserService $userService, IUserUseCase $userUseCase)
    {
        $this->userService = $userService;
        $this->userUseCase = $userUseCase;
    }

    // GET controller
    public function showAll()
    {
        $response = $this->userService->getAllUsers();
        return response()->json($response, $response['status']);
    }

    // GET controller
    public function showByID($id)
    {
        $response = $this->userService->getUserById($id);
        return response()->json($response, $response['status']);
    }

    // POST controller
    public function createUser(Request $request)
    {
        $response = $this->userUseCase->handleCreateUser($request->all());
        if ($response['success']) {
            $userId = Auth::id();
            if ($userId) {
                event(new ResourceAction(
                    $userId,
                    'Solicitud POST',
                    'Gestion Usuarios',
                    $response['data']['idusuarios'],
                    ['Detalles' => $request->all()]
                ));
            }
        }
        return response()->json($response, $response['status']);
    }

    // PATCH controller / updatePartialUser
    public function updatePartialUser(Request $request, $id)
    {
        $response = $this->userUseCase->handlePartialUser($id, $request->all());
        if ($response['success']) {
            $userId = Auth::id();
            if ($userId) {
                event(new ResourceAction(
                    $userId,
                    'Solicitud PATCH Parcial',
                    'Gestion Usuarios',
                    $id,
                    ['Detalles' => $request->all()]
                ));
            }
        }
        return response()->json($response, $response['status']);
    }

    // DELETE controller / deleteUser
    public function deleteUser($id)
    {
        $response = $this->userService->deleteUser($id);
        if ($response['success']) {
            $userId = Auth::id();
            if ($userId) {
                event(new ResourceAction(
                    $userId,
                    'Solicitud DELETE',
                    'Gestion Usuarios',
                    $id,
                    ['Detalles' => 'Eliminación del recurso con ID ' . $id]
                ));
            }
        }
        return response()->json($response, $response['status']);
    }
}