import MainLayout from "../layouts/MainLayout";
import ClockWidget from "../features/clock/ClockWidget";
import CurrencyWidget from "../features/currency/CurrencyWidget";
import TodoWidget from "../features/todo/TodoWidget";
import CalendarWidget from "../features/calendar/CalendarWidget";
import SearchWidget from "../features/search/SearchWidget";
import ProfileWidget from "../features/profile/ProfileWidget";
import EventWidget from "../features/event/EventWidget";
import NewsWidget from "../features/news/NewsWidget";

export default function NewTab() {
  return (
    <MainLayout>
      <ClockWidget />
      <SearchWidget />
      <ProfileWidget />
      <CurrencyWidget />
      <TodoWidget />
      <EventWidget />
      <NewsWidget />
      <CalendarWidget />
    </MainLayout>
  );
}
