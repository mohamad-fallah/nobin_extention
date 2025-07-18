import MainLayout from "./layouts/MainLayout";
import WeatherWidget from "./features/weather/WeatherWidget";
import SearchWidget from "./features/search/SearchWidget";
import ProfileWidget from "./features/profile/ProfileWidget";
import CurrencyWidget from "./features/currency/CurrencyWidget";
import TodoWidget from "./features/todo/TodoWidget";
import CalendarWidget from "./features/calendar/CalendarWidget";

function App() {
  return (
    <MainLayout>
      <div className="grid grid-cols-4 gap-4">
        {/* ردیف اول */}
        <div className="col-span-1">
          <WeatherWidget />
        </div>
        <div className="col-span-2">
          <SearchWidget />
        </div>
        <div className="col-span-1">
          <ProfileWidget />
        </div>

        {/* ردیف دوم */}
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
