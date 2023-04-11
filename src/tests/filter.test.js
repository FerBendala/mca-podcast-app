import React from 'react'

import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'

import Filter from '../components/filter/filter'

describe( 'Filter component', () => {
    test( 'Renders the Filter component', () => {
        const setSearchTerm = jest.fn()
        const { getByPlaceholderText, getByText } = render(
            <Filter
                resultsNumber={10}
                searchTerm=""
                setSearchTerm={setSearchTerm}
                text="Search..."
            />
        )
        expect( getByText( '10' ) ).toBeInTheDocument()
        expect( getByPlaceholderText( 'Search...' ) ).toBeInTheDocument()
    } )

    test( 'Updates search term when typing', () => {
        const setSearchTerm = jest.fn()
        const { getByPlaceholderText } = render(
            <Filter
                resultsNumber={10}
                searchTerm=""
                setSearchTerm={setSearchTerm}
                text="Search..."
            />
        )
        const searchInput = getByPlaceholderText( 'Search...' )
        fireEvent.change( searchInput, { target: { value: 'react' } } )
        expect( searchInput.value ).toBe( 'react' )
        expect( setSearchTerm ).toHaveBeenCalledWith( 'react' )
    } )
} )