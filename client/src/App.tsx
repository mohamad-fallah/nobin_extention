import MainLayout from "./layouts";
import CalendarWidget from "./widgets/calendar/CalendarWidget";
import CurrencyWidget from "./widgets/currency/CurrencyWidget";
import ProfileWidget from "./widgets/profile/ProfileWidget";
import SearchWidget from "./widgets/search/SearchWidget";
import TodoWidget from "./widgets/todo/TodoWidget";
import WeatherWidget from "./widgets/weather/WeatherWidget";

function App() {
  return (
    <MainLayout>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-1">
          <WeatherWidget />
        </div>
        <div className="col-span-2">
          <SearchWidget />
        </div>
        <div className="col-span-1">
          <ProfileWidget />
        </div>

        <div className="col-span-1">
          <CurrencyWidget />
        </div>
        <div className="col-span-2">
          <TodoWidget />
        </div>
        <div className="col-span-1">
          <CalendarWidget />
        </div>
      </div>
    </MainLayout>
  );
}

export default App;
