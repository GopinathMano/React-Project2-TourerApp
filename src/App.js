import React, { useState, useEffect } from "react";
import Loading from "./loading";
import Tours from "./tours";

const url = "https://course-api.com/react-tours-project";
function App() {
  // usestate
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  // fetching data
  const fetchTours = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const tours = await response.json();
      setTours(tours);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  // render once  and fetch the data
  useEffect(() => {
    fetchTours();
  }, []);

  // removetour fun
  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };

  //  loding page while fetching data
  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }
  // refresh for no data in the tour
  if (tours.length === 0) {
    return (
      <main>
        <h4 className="title"> No Tour-plans</h4>
        <button className="btn" onClick={() => fetchTours()}>
          Refresh
        </button>
      </main>
    );
  }
  // main content
  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
}

export default App;
