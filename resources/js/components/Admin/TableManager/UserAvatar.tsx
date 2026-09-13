import { userAvatar } from "@/lib/users";

interface UserAvatarProps {
    name?:string;
}

export default function UserAvatar({name = "?"} : UserAvatarProps) {
    return (
        <div className="w-8.5 h-8.5 rounded-lg bg-blue-100 text-blue-600 font-semibold flex items-center justify-center select-none">
            {userAvatar(name)}
        </div>
    )
}