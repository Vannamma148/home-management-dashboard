import React, { useMemo, useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Edit2,
  Trash2,
} from "lucide-react";

/* ----------------- Helpers ----------------- */
const pad = (n) => String(n).padStart(2, "0");
const dateKeyFrom = (d) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

/* sample initial events */
const INITIAL_EVENTS = {
  "2025-11-20": [
    { id: 1, title: "Electrician Visit", time: "10:00 AM", type: "Meeting" },
  ],
  "2025-11-22": [
    { id: 2, title: "Buy Groceries", time: "6:00 PM", type: "Task" },
    { id: 3, title: "Mom's Birthday", time: "All Day", type: "Reminder" },
  ],
};

const FILTERS = ["All", "Meeting", "Task", "Reminder"];

/* ----------------- Main Calendar Page ----------------- */
export default function CalendarPremium() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventsMap, setEventsMap] = useState(() => INITIAL_EVENTS);
  const [filter, setFilter] = useState("All");

  /* Drawer state */
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const year = currentMonth.getFullYear();
  const monthIndex = currentMonth.getMonth();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const firstDay = new Date(year, monthIndex, 1).getDay();

  /* ---------- Month nav ---------- */
  const prevMonth = () => setCurrentMonth(new Date(year, monthIndex - 1, 1));
  const nextMonth = () => setCurrentMonth(new Date(year, monthIndex + 1, 1));

  /* ---------- Event helpers ---------- */
  const addEvent = ({ dateKey, title, time, type }) => {
    const id = Date.now();
    setEventsMap((prev) => {
      const list = prev[dateKey] ? [...prev[dateKey]] : [];
      return { ...prev, [dateKey]: [{ id, title, time, type }, ...list] };
    });
    setDrawerOpen(false); // auto close drawer after save
  };

  const updateEvent = ({ id, dateKey, title, time, type, prevDateKey }) => {
    setEventsMap((prev) => {
      const copy = { ...prev };
      if (prevDateKey && prevDateKey !== dateKey) {
        copy[prevDateKey] = (copy[prevDateKey] || []).filter((e) => e.id !== id);
        if (copy[prevDateKey].length === 0) delete copy[prevDateKey];
      }
      copy[dateKey] = (copy[dateKey] || []).map((e) =>
        e.id === id ? { ...e, title, time, type } : e
      );
      return copy;
    });
    setDrawerOpen(false); // auto close drawer after save
  };

  const deleteEvent = (id, dateKey) => {
    setEventsMap((prev) => {
      const copy = { ...prev };
      copy[dateKey] = (copy[dateKey] || []).filter((e) => e.id !== id);
      if (copy[dateKey].length === 0) delete copy[dateKey];
      return copy;
    });
  };

  /* ---------- Calendar click ---------- */
  const handleSelectDate = (dateObj) => {
    setSelectedDate(dateObj);
  };

  /* ---------- Open add drawer ---------- */
  const openAddDrawer = () => {
    setEditing(null);
    setDrawerOpen(true);
  };

  /* ---------- Events for selected date ---------- */
  const eventsForSelectedDate = (eventsMap[dateKeyFrom(selectedDate)] || []).filter(
    (ev) => filter === "All" || ev.type === filter
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-teal-700">Calendar</h1>
          <p className="text-sm text-gray-500">Click a date to view events</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-full text-sm ${
                  filter === f ? "bg-teal-600 text-white" : "bg-white border"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 ml-2">
            <button
              onClick={prevMonth}
              className="px-2 py-1 rounded-lg bg-gray-200 hover:bg-gray-300"
            >
              <ChevronLeft />
            </button>
            <div className="px-4 text-lg font-medium">
              {currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}
            </div>
            <button
              onClick={nextMonth}
              className="px-2 py-1 rounded-lg bg-gray-200 hover:bg-gray-300"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>

      <DndContext>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar Grid */}
          <div className="lg:col-span-2 bg-white rounded-xl p-4 shadow">
            <CalendarGrid
              year={year}
              monthIndex={monthIndex}
              daysInMonth={daysInMonth}
              firstDay={firstDay}
              eventsMap={eventsMap}
              filter={filter}
              selectedDate={selectedDate}
              onSelectDate={handleSelectDate}
            />
          </div>

          {/* Events Panel */}
          <EventsPanel
            selectedDate={selectedDate}
            events={eventsForSelectedDate}
            openAddDrawer={openAddDrawer}
            setEditing={setEditing}
            setDrawerOpen={setDrawerOpen}
            deleteEvent={deleteEvent}
          />
        </div>
      </DndContext>

      {/* Add/Edit Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <AddEventDrawer
            initialDateKey={dateKeyFrom(selectedDate)}
            editing={editing}
            onClose={() => setDrawerOpen(false)}
            onSave={(payload) => {
              if (editing && editing.id) {
                updateEvent({ ...payload, prevDateKey: editing.dateKey });
              } else {
                addEvent(payload);
              }
            }}
            onDelete={(id, dateKey) => deleteEvent(id, dateKey)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ----------------- Calendar Grid ----------------- */
function CalendarGrid({
  year,
  monthIndex,
  daysInMonth,
  firstDay,
  eventsMap,
  filter,
  selectedDate,
  onSelectDate,
}) {
  const blanks = Array.from({ length: firstDay }).map((_, i) => <div key={`b-${i}`} />);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <>
      <div className="grid grid-cols-8 text-center font-semibold text-gray-600 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {blanks}
        {days.map((day) => {
          const dateObj = new Date(year, monthIndex, day);
          const key = dateKeyFrom(dateObj);
          const dayEvents = (eventsMap[key] || []).filter(
            (ev) => filter === "All" || ev.type === filter
          );
          const isSelected =
            selectedDate.getDate() === day &&
            selectedDate.getMonth() === monthIndex &&
            selectedDate.getFullYear() === year;

          return (
            <DayCell
              key={key}
              dateObj={dateObj}
              isSelected={isSelected}
              events={dayEvents}
              onClick={() => onSelectDate(dateObj)}
            />
          );
        })}
      </div>
    </>
  );
}

/* ----------------- Day Cell ----------------- */
function DayCell({ dateObj, isSelected, events, onClick }) {
  return (
    <div className="p-1">
      <div
        onClick={onClick}
        className={`h-20 rounded-lg border flex flex-col justify-between p-2 cursor-pointer
          ${isSelected ? "bg-teal-600 text-white" : "bg-white hover:bg-teal-50"}
          ${events.length ? "border-teal-200" : "border-gray-200"}
        `}
      >
        <div className="flex justify-between items-start">
          <div className="text-sm font-medium">{dateObj.getDate()}</div>
        </div>

        {/* tiny event dots */}
        <div className="flex gap-1">
          {events.slice(0, 3).map((ev) => (
            <div
              key={ev.id}
              className={`w-2 h-2 rounded-full ${
                ev.type === "Meeting"
                  ? "bg-teal-500"
                  : ev.type === "Task"
                  ? "bg-yellow-500"
                  : "bg-violet-500"
              }`}
              title={`${ev.title} • ${ev.time}`}
            />
          ))}
          {events.length > 3 && <div className="text-xs text-gray-400">+{events.length - 3}</div>}
        </div>
      </div>
    </div>
  );
}

/* ----------------- Events Panel ----------------- */
function EventsPanel({ selectedDate, events, openAddDrawer, setEditing, setDrawerOpen, deleteEvent }) {
  const dateStr = selectedDate.toDateString();

  return (
    <div className="bg-white rounded-xl p-4 shadow flex flex-col max-h-[80vh] overflow-auto">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-lg">{dateStr}</h2>
        <button
          onClick={openAddDrawer}
          className="flex items-center gap-1 px-2 py-1 rounded bg-teal-600 text-white text-sm hover:bg-teal-700"
        >
          <Plus size={14} /> Add Event
        </button>
      </div>

      <div className="space-y-3">
        {events.length === 0 && <div className="text-gray-500">No events for this day.</div>}

        {events.map((ev) => (
          <div key={ev.id} className="p-3 rounded-lg border bg-teal-50 flex items-start justify-between">
            <div>
              <div className="font-semibold text-teal-700">{ev.title}</div>
              <div className="text-sm text-gray-600">{ev.time} • {ev.type}</div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setEditing(ev);
                  setDrawerOpen(true);
                }}
                className="p-2 rounded hover:bg-gray-100"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => deleteEvent(ev.id, dateKeyFrom(selectedDate))}
                className="p-2 rounded hover:bg-red-50 text-red-500"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ----------------- Add/Edit Drawer ----------------- */
function AddEventDrawer({ initialDateKey, editing, onClose, onSave, onDelete }) {
  const [state, setState] = React.useState(() => {
    if (editing) {
      return { ...editing, dateKey: editing.dateKey || initialDateKey };
    }
    return { title: "", time: "", type: "Meeting", dateKey: initialDateKey };
  });

  React.useEffect(() => {
    if (editing) setState({ ...editing, dateKey: editing.dateKey || initialDateKey });
    else setState({ title: "", time: "", type: "Meeting", dateKey: initialDateKey });
  }, [editing, initialDateKey]);

  const submit = (e) => {
    e.preventDefault();
    if (!state.title) return;
    onSave(state);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onClose}
      />
      <motion.aside
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 120, damping: 24 }}
        className="fixed right-0 top-0 bottom-0 w-full md:w-96 bg-white z-50 p-6 overflow-auto shadow-2xl"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">{editing ? "Edit Event" : "Add Event"}</h3>
          <button onClick={onClose} className="text-gray-500">Close</button>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Title</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={state.title}
              onChange={(e) => setState((s) => ({ ...s, title: e.target.value }))}
              placeholder="e.g. Dentist appointment"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Date</label>
            <input
              type="date"
              className="w-full border rounded px-3 py-2"
              value={state.dateKey}
              onChange={(e) => setState((s) => ({ ...s, dateKey: e.target.value }))}
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Time</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={state.time}
              onChange={(e) => setState((s) => ({ ...s, time: e.target.value }))}
              placeholder="e.g. 10:00 AM or All Day"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Type</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={state.type}
              onChange={(e) => setState((s) => ({ ...s, type: e.target.value }))}
            >
              <option>Meeting</option>
              <option>Task</option>
              <option>Reminder</option>
            </select>
          </div>

          <div className="flex gap-3 mt-4">
            <button type="submit" className="bg-teal-600 text-white px-4 py-2 rounded">Save</button>

            {editing && (
              <button
                type="button"
                onClick={() => onDelete(editing.id, editing.dateKey)}
                className="bg-red-50 text-red-600 px-4 py-2 rounded border"
              >
                Delete
              </button>
            )}

            <button type="button" onClick={onClose} className="px-4 py-2 rounded border">Cancel</button>
          </div>
        </form>
      </motion.aside>
    </>
  );
}
