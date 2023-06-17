import React, { useState } from 'react';

function useSetError() {
    const [state, setState] = useState()
    return (error) => {
        setState(() => {
            throw error
        })
    }
}