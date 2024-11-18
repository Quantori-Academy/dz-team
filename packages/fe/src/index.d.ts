// https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forward_and_create_ref/
interface ForwardRefWithGenerics extends React.FC<WithForwardRefProps<Option>> {
    <T extends Option>(props: WithForwardRefProps<T>): ReturnType<React.FC<WithForwardRefProps<T>>>;
}
