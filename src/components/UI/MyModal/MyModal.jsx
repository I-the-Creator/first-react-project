import React from 'react';
import cl from './MyModal.module.css'

// модальное окно - можем поместить туда любой компонент или текст
// visible -props отвечающий за видимость окна, setVisible - функция скрытия/отображения мод. окна
const MyModal = ({children, visible, setVisible}) => {

    // определяем массив классов и решаем добавлят класс .active или нет к этому массиву
    const rootClasses = [cl.myModal]
        if (visible) {
            rootClasses.push(cl.active);
        }

    return (
        // чтобы добавить несколько классов, берем массив классов и join их через пробел (' ') если их несколько
        // join - возвращает строку
        // setVisible(false) - сокрытие мо. окна при клике на область вне окна
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            {/* e.stopPropagation - чтобы окно не закрывалось при клике на самом окне */}
            <div className={cl.myModalContent} onClick={(e) => e.stopPropagation()}>
                {/* чтобы в модальное окно помещать все что требуется используем props 'children' */}
                {children}
            </div>
        </div>
    );
};

export default MyModal;