'use client'

import { Spinner } from "@heroui/react";

const LoadingData = () => {
    return <>
        <div className="flex justify-center items-center py-12">
            <Spinner
                label="Loading..."
                color="primary"
                labelColor="primary"
                size="lg"
            />
        </div>
    </>;
};

export default LoadingData;