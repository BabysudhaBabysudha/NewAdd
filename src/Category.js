import React, { useState } from 'react';
import { IonCol, IonGrid, IonRow, IonSelect, IonSelectOption, IonButton, IonInput } from '@ionic/react';

const Category = () => {
  const Category = [
  "Vegetables",
  "Fruits & Nuts",
  "Dairy & Creams",
  "Packages Food",
  "Staples"]; 
  const [options, setOptions] = useState(Category);
  const [newOption, setNewOption] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const handleAddOption = () => {
    if (newOption && !options.includes(newOption)) {
      setOptions([...options, newOption]);
      setNewOption('');
    }
  };

  const handleDeleteOption = () => {
    const updatedOptions = options.filter((option) => option !== selectedOption);
    setOptions(updatedOptions);
    setSelectedOption('');
  };

  const handleUpdateOption = () => {
    if (selectedOption && newOption && !options.includes(newOption)) {
      const updatedOptions = options.map((option) =>
        option === selectedOption ? newOption : option
      );
      setOptions(updatedOptions);
      setSelectedOption('');
      setNewOption('');
    }
  };

  return (
    <IonGrid  style={{border:"1px solid"}}>
      <IonRow>
        <IonCol>
          <IonSelect
            value={selectedOption}
            placeholder="Select an option"
            onIonChange={(e) => setSelectedOption(e.detail.value)}
          >
            {options.map((option, index) => (
              <IonSelectOption key={index} value={option}>
                {option}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonInput
            value={newOption}
            placeholder="New option"
            onIonChange={(e) => setNewOption(e.detail.value)}
          />
        </IonCol>
        <IonCol>
          <IonButton onClick={handleAddOption}>Add</IonButton>
          <IonButton onClick={handleDeleteOption}>Delete</IonButton>
          <IonButton onClick={handleUpdateOption}>Update</IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default Category;
