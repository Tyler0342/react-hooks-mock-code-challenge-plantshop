import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((resp) => resp.json())
      .then((plantsData) => {
        setPlants(plantsData);
      });
  }, []);
  
  

  function handleAddPlant(newPlant) {
    const updatedPlantsData = [...plants, newPlant];
    setPlants(updatedPlantsData);
  }

  function handleDeletePlant(id) {
    const updatedPlantsData = plants.filter((plant) => plant.id !== id);
    setPlants(updatedPlantsData);
  }

  function handleUpdatePlant(updatedPlant) {
    const updatedPlantsData = plants.map((plant) => {
      if (plant.id === updatedPlant.id) {
        return updatedPlant;
      } else {
        return plant;
      }
    });
    setPlants(updatedPlantsData);
  }

  const displayedPlants = plants.filter((plant) => {
    return plant.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search searchTerm={searchTerm} onSearchChange={setSearchTerm}  />
      <PlantList
      //display plants
      //{plants={plants}}
        plants={displayedPlants}
        onDeletePlant={handleDeletePlant}
        onUpdatePlant={handleUpdatePlant}
      />
    </main>
  );
}

export default PlantPage;


