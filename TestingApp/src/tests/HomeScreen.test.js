import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../screens/HomeScreen';

describe('HomeScreen Integration', () => {

  test('agrega una tarea', () => {

    const { getByTestId, getByText } = render(<HomeScreen />);

    const input = getByTestId('input');
    const button = getByTestId('add-button');

    fireEvent.changeText(input, 'Nueva tarea');
    fireEvent.press(button);

    expect(getByText('Nueva tarea')).toBeTruthy();

  });

});