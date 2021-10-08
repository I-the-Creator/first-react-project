import React from 'react';

// принимает props-ы: 1) массив объектов 'option', 2)default 'option', 3)value, 4)
const MySelect = ({options, defaultValue, value, onChange}) => {
    console.log(options);  // массив вариантов сортировки
    return (
        <select
            value={value}
            // при изменении передаем не сам event, а его значение выбранное пользователем
            onChange={event => onChange(event.target.value)}
        >
            <option disabled value="">{defaultValue}</option>
            {/* итеррируемся по массиву 'option' и для каждого элемента отрисовывем тег <option> */}
            {options.map(option =>
            // при итеррации по массиву обязательно добавляем KEY 
                <option key={option.value} value={option.value}>
                    {option.name}
                </option>          
            )}
        </select>
    );
};

export default MySelect;