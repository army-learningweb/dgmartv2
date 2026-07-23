<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\AdminPostController;
use App\Http\Controllers\AdminProductController;
use App\Http\Controllers\AdminUserController;

Route::inertia('/', 'welcome')->name('home');

//AUTH
Route::get('/admin/login', [AdminAuthController::class, 'login'])->name('login');
Route::post('/admin/login/storeLogin', [AdminAuthController::class, 'storeLogin']);
Route::post('/admin/logout', [AdminAuthController::class, 'logout']);
Route::get('/admin/register', [AdminAuthController::class, 'register']);
Route::post('/admin/register/store', [AdminAuthController::class, 'store']);

Route::middleware(['auth:sanctum'])->group( function(){

    //DASHBOARD
    Route::get('/admin/dashboard', [AdminDashboardController::class, 'read']);

    //USER
    Route::get('/admin/users', [AdminUserController::class, 'read']);
    Route::post('/admin/users/store', [AdminUserController::class, 'store']);
    Route::patch('/admin/users/{user}/update', [AdminUserController::class, 'update']);
    Route::patch('/admin/users/{user}/updateStatus', [AdminUserController::class, 'updateStatus']);
    Route::delete('/admin/users/{user}/delete', [AdminUserController::class, 'delete']);

    //PRODUCT
    Route::get('/admin/products', [AdminProductController::class, 'read']);

    //POST
    Route::get('/admin/posts', [AdminPostController::class, 'read']);

});