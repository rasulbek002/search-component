import React from 'react'

export default function Button({ styles, children, onClick }) {
    return (
        <button onClick={onClick} className={` rounded-[5px] text-[white] py-[14px] px-[40px] ${styles}`}>{children}</button>
    )
}
