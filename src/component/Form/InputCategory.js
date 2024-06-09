import React from 'react'

const InputCategory = ({ value, setValue, handleSubmit }) => {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text" className="form-control my-2" placeholder="Enter you category"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default InputCategory
