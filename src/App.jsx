import React, { useState } from "react";
import axios from "axios";
import "./style.css";
function App() {
  const [data, setData] = useState({});
  const [unit, setUnit] = useState("imperial");

  const [location, setLocation] = useState("");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&appid=1fa9ff4126d95b8db54f3897a208e91c`;

  const timeString = data.dt
    ? new Date(data.dt * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    : "";

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  return (
    <div className="App">
      {/* bootstrap */}

      <section className="vh-100" style={{ backgroundcolor: "#4B515D" }}>
        <div className="container py-15 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-8 col-lg-6 col-xl-8">
              <div
                className="card"
                // style="color: #4B515D; border-radius: 35px;"
              >
                <h3 className="mb-4 pb-2 fw-small d-flex justify-content-center align-items-center">
                  {" "}
                  Check the weather forecast
                </h3>

                <div className="input-group rounded mb-3 ">
                  <input
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    onKeyPress={searchLocation}
                    type="search"
                    className="form-control rounded "
                    placeholder="Enter your City "
                    aria-label="Search"
                    aria-describedby="search-addon"
                  />
                </div>
                <div className="card-body p-4">
                  <div className="d-flex">
                    <h6 className="flex-grow-1">{data.name}</h6>

                    <h6>
                      {timeString
                        ? `${timeString}`
                        : `Enter a country to see its local time`}
                    </h6>
                  </div>

                  <div class="d-flex flex-row justify-content-center align-items-center mt-5 mb-4">
                    <h6
                      className={`display-4 mb-0 font-weight-bold animate__animated ${
                        data && data.main ? "animate__fadeIn" : ""
                      }`}
                    >
                      {data && data.main && data.main.temp}
                      °F
                    </h6>
                    <h6 class="mx-3 mb-0">|</h6>
                    <h6
                      onClick={() => setUnit("metric")}
                      className={`display-4 mb-0 font-weight-bold animate__animated ${
                        data && data.main ? "animate__fadeIn" : ""
                      }`}
                    >
                      {data &&
                        data.main &&
                        Math.abs(((data.main.temp - 32) * 5) / 9).toFixed(2)}
                      &deg;C
                    </h6>

                    <span className="small " style={{ color: "#868B94" }}>
                      {data.weather &&
                        data.weather.length > 0 &&
                        data.weather[0].description}
                    </span>
                  </div>

                  <div className="d-flex align-items-center">
                    <div
                      className="flex-grow-1"
                      // style="font-size: 1rem;"
                    >
                      <div>
                        <i
                          className="fas fa-wind fa-fw"
                          // style="color: #868B94;"
                        ></i>{" "}
                        <span className="ms-1">
                          <h6>
                            Feels like:{" "}
                            {data && data.main && data.main.feels_like}
                          </h6>
                        </span>
                      </div>
                      <div>
                        <i
                          className="fas fa-tint fa-fw"
                          // style="color: #868B94;"
                        ></i>{" "}
                        <span className="ms-1">
                          {" "}
                          <h6>
                            Humidity: {data && data.main && data.main.humidity}{" "}
                            %
                          </h6>
                        </span>
                      </div>
                      <div>
                        <i
                          className="fas fa-sun fa-fw"
                          // style="color: #868B94;"
                        ></i>{" "}
                        <span className="ms-1">
                          <h6>
                            Wind speed: {data && data.wind && data.wind.speed}
                          </h6>
                        </span>
                      </div>
                    </div>
                    <div>
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/ilu1.webp"
                        width="100px"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default App;
