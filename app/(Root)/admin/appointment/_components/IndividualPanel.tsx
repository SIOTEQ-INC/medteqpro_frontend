import { DataTable } from "@/components/DataTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Appointment, appointmentColumns } from "./columns";

interface IndividualPanelProps {
  appointments?: Appointment[];
  isLoading?: boolean;
}

export const IndividualPanel = ({ appointments = [], isLoading = false }: IndividualPanelProps) => {
  // Filter appointments by status
  const allAppointments = appointments;
  
  const upcomingAppointments = appointments.filter(
    (appointment) => appointment.status === "Upcoming"
  );
  
  const completedAppointments = appointments.filter(
    (appointment) => appointment.status === "Completed"
  );
  
  const rescheduledAppointments = appointments.filter(
    (appointment) => appointment.status === "Rescheduled"
  );
  
  const cancelledAppointments = appointments.filter(
    (appointment) => appointment.status === "Cancelled"
  );
  return (
    <Tabs defaultValue="all">
      <TabsList className="bg-transparent p-0">
        <TabsTrigger value="all" className="text-gray-600 data-[state=active]:border-2 data-[state=active]:border-cyan-600 px-6 data-[state=active]:bg-cyan-200 rounded-none">All</TabsTrigger>
        <TabsTrigger value="upcoming"  className="text-gray-600 data-[state=active]:border-2 data-[state=active]:border-cyan-600 px-6 data-[state=active]:bg-cyan-200 rounded-none">Upcoming</TabsTrigger>
        <TabsTrigger value="completed"  className="text-gray-600 data-[state=active]:border-2 data-[state=active]:border-cyan-600 px-6 data-[state=active]:bg-cyan-200 rounded-none">Completed</TabsTrigger>
        <TabsTrigger value="rescheduled"  className="text-gray-600 data-[state=active]:border-2 data-[state=active]:border-cyan-600 px-6 data-[state=active]:bg-cyan-200 rounded-none">Rescheduled</TabsTrigger>
        <TabsTrigger value="cancelled"  className="text-gray-600 data-[state=active]:border-2 data-[state=active]:border-cyan-600 px-6 data-[state=active]:bg-cyan-200 rounded-none">Cancelled</TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <DataTable 
          columns={appointmentColumns} 
          data={allAppointments} 
          options={{ isLoading }} 
        />
      </TabsContent>
      <TabsContent value="upcoming">
        <DataTable 
          columns={appointmentColumns} 
          data={upcomingAppointments} 
          options={{ isLoading }} 
        />
      </TabsContent>
      <TabsContent value="completed">
        <DataTable 
          columns={appointmentColumns} 
          data={completedAppointments} 
          options={{ isLoading }} 
        />
      </TabsContent>
      <TabsContent value="rescheduled">
        <DataTable
          columns={appointmentColumns}
          data={rescheduledAppointments}
          options={{ isLoading }}
        />
      </TabsContent>
      <TabsContent value="cancelled">
        <DataTable 
          columns={appointmentColumns} 
          data={cancelledAppointments} 
          options={{ isLoading }} 
        />
      </TabsContent>
    </Tabs>
  );
};
