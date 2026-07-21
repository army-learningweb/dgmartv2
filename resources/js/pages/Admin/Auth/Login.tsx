import AuthLayout from "@/layouts/Admin/AuthLayout"
import { Link, useForm } from "@inertiajs/react"
import { Head } from "@inertiajs/react"
import { ReactElement, useEffect, useRef } from "react"
import Input from "@/components/ui/Input"
import Button from "@/components/ui/Button"

function Login() {

    const {data, setData, post, errors, processing, reset} = useForm({
        email: "",
        password: ""
    });

    const handleSubmit = (e:React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        post("/admin/login/storeLogin",{
            onError : () => reset('password')
        });
    }

    const ipRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        ipRef.current?.focus();
    }, [])

    return (
        <>
            <Head title="Đăng nhập" />
            <div className="my-3 space-y-1">
                <div className="font-medium">Đăng nhập trang quản lí</div>
                <div className="text-gray-500">Điền thông tin vào form bên dưới để đăng nhập</div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="mt-2">
                    <Input type="text" name="email" label="Email" value={data.email} onChange={(e) => setData("email",e.target.value)} error={errors.email} ref={ipRef} autoComplete="username"/>
                </div>

                <div className="mt-2">
                    <Input type="password" name="password" label="Mật khẩu" value={data.password} onChange={(e) => setData("password",e.target.value)} error={errors.password} autoComplete="current-password"/>
                </div>

                <div className="mt-3">
                    <Button type="submit" disabled={processing} processing={processing} processingLabel="Đăng nhập..." className="w-full">Đăng nhập</Button>
                </div>

                <div className="mt-3 text-center">
                    <span className="text-gray-500">Chưa có tài khoản ?</span> <Link href="/admin/register" className="text-blue-600 underline">Đăng ký</Link>
                </div>
            </form>
        </>

    )
}

Login.layout = (page: ReactElement) => <AuthLayout>{page}</AuthLayout>
export default Login;