interface IProps {
    children: React.ReactNode
    isActorGrid?: boolean
}
const GridLayout = ({ children, isActorGrid = false }: IProps) => {
    return <>
        <div className={`flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${isActorGrid ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" : ""}`}>
            {children}
        </div>
    </>;
};

export default GridLayout;