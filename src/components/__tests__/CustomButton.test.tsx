import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';

import CustomButton from '../CustomButton';

describe('CustomButton', () => {
    it('muestra el texto del botón', () => {
        render(
            <CustomButton
                title="Agregar manga"
                onPress={jest.fn()}
            />
        );

        expect(
            screen.getByText('Agregar manga')
        ).toBeTruthy();
    });

    it('ejecuta onPress cuando se presiona', () => {
        const onPress = jest.fn();

        render(
            <CustomButton
                title="Agregar manga"
                onPress={onPress}
            />
        );

        fireEvent.press(
            screen.getByText('Agregar manga')
        );

        expect(onPress).toHaveBeenCalledTimes(1);
    });
});