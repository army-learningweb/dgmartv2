import AuthLayout from "@/layouts/Admin/AuthLayout"
import { Link, useForm, router } from "@inertiajs/react"
import { Head } from "@inertiajs/react"
import { ReactElement, useRef, useEffect } from "react"
import Input from "@/components/ui/Input"
import Button from "@/components/ui/Button"

function Register() {
    const { data, setData, post, errors, processing, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
    })

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        post("/admin/register/store", {
            onError: () => {
                reset("password"),
                    reset("password_confirmation")
            }
        });
    }

    const ipRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        ipRef.current?.focus();
    }, [])

    return (
        <>
            <Head title="Đăng ký" />
            <div className="my-3 space-y-1">
                <div className="font-medium">Đăng ký tài khoản</div>
                <div className="text-gray-500">Điền thông tin vào form bên dưới để tạo tài khoản</div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="mt-2">
                    <Input type="text" name="name" label="Họ và tên" error={errors.name} value={data.name} onChange={(e) => setData("name", e.target.value)} ref={ipRef} autoComplete="on" />
                </div>

                <div className="mt-2">
                    <Input type="text" name="email" label="Email" error={errors.email} value={data.email} onChange={(e) => setData("email", e.target.value)} autoComplete="username" />
                </div>

                <div className="mt-2">
                    <Input type="password" name="password" label="Mật khẩu" error={errors.password} value={data.password} onChange={(e) => setData("password", e.target.value)} autoComplete="current-password" />
                </div>

                <div className="mt-2">
                    <Input type="password" name="password_confirmation" label="Xác nhận mật khẩu" value={data.password_confirmation} onChange={(e) => setData("password_confirmation", e.target.value)} autoComplete="new-password" />
                </div>

                <div className="mt-3">
                    <Button type="submit" disabled={processing} processing={processing} processingLabel="Đăng ký..." className="w-full">Đăng ký</Button>
                </div>


                <div className="mt-3 text-center">
                    <span className="text-gray-500">Đã có tài khoản ?</span>  <Link href="/admin/login" className="text-blue-600 underline">Đăng nhập</Link>
                </div>
            </form>
        </>

    )
}

Register.layout = (page: ReactElement) => <AuthLayout>{page}</AuthLayout>
export default Register;