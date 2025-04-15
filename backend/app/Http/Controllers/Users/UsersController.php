<?php

namespace App\Http\Controllers\Users;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
// Llamada del evento
use App\Events\ResourceAction;
use App\Http\Controllers\Controller;
// Importacion de Interfaces
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
        if($response['success']) {
            event(new ResourceAction(
                Auth::id(),
                'get',
                'user',
                null,
                ['path' => request()->path()]
            ));
        }
        return response()->json($response, $response['status']);
    }

    // GET controller
    public function showByID($id)
    {
        $response = $this->userService->getUserById($id);
        if ($response['success']) {
            $userId = Auth::id();
            if ($userId) {
                event(new ResourceAction(
                    $userId,
                    'get_by_id',
                    'user',
                    $id,
                    ['path' => request()->path()]
                ));
            }
        }
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
                    'create',
                    'user',
                    $response['data']['idusuarios'],
                    ['data' => $request->all()]
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
                    'update_partial',
                    'user',
                    $id,
                    ['data' => $request->all()]
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
                    'delete',
                    'user',
                    $id,
                    []
                ));
            }
        }
        return response()->json($response, $response['status']);
    }
}
