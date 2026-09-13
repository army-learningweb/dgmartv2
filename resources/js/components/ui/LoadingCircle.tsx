interface LoadingCircleProps{
    className?: string;
}

export default function LoadingCircle({className} : LoadingCircleProps){
    return(
        <div className={`w-4 h-4 border-2 rounded-full animate-spin shrink-0 border-white ${className} border-t-transparent`}></div>       
    )
}