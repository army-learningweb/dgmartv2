import { userAvatar } from "@/lib/users";

interface UserAvatarProps {
    name?:string;
}

export default function UserAvatar({name = "?"} : UserAvatarProps) {
    return (
        <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-medium flex items-center justify-center">
            {userAvatar(name)}
        </div>
    )
}