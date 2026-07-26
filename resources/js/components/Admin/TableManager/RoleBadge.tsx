interface RoleBadgeProps{
    name:string
}

export default function RoleBadge({name} : RoleBadgeProps) {

    return (
        <div className="bg-amber-50 text-amber-700 w-fit px-2 py-0.75 rounded-md text-xs font-medium ">
            {name}
        </div>
    )
}