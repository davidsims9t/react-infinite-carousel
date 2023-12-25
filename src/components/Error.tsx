export type ErrorProps = {
    message: string;
};

export const Error = ({ message }: ErrorProps) => {
    return (
        <div className="error">
            { message }
        </div>
    );
};

export default Error;