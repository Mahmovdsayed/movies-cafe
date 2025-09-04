'use client'

import { Pagination } from "@heroui/react";

interface IProps {
    total: number;
    page: number;
    onChange: (page: number) => void;
}
const PaginationUi = ({ total, page, onChange }: IProps) => {
    return <>
        <div className="overflow-hidden my-6 flex justify-center items-center">
            <Pagination
                showControls
                total={total}
                page={page}
                onChange={onChange}
                color="default"
                size="md"
                initialPage={1}
            />
        </div>
    </>;
};

export default PaginationUi;