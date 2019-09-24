import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
    display: flex;
    flex-direction: column;
    width: 25%;
`

const Select = styled.select`
    height: 40px;
    text-align-last: center;
    font-size: 25px;
    margin-bottom: 15px;
`

export default function RecipiesList() {
    return (
        <Div>
            <Select>
                <option value='' disabled selected>Breakfast</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </Select>
            <Select>
                <option value='' disabled selected>Lunch</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </Select>
            <Select>
                <option value='' disabled selected>Dinner</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </Select>
            <Select>
                <option value='' disabled selected>Dessert</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </Select>
            <Select>
                <option value='' disabled selected>Snacks</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </Select>
        </Div>
    )
}
