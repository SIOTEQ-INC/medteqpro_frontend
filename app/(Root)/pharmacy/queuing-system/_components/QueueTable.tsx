"use client";

import { DataTable } from '@/components/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Define the type for queue entries
export type QueueEntry = {
  counter: number;
  serialNumber: string;
  gender: string;
  patientName?: string;
  estimatedTime: string;
  status?: string;
  id?: string;
};

type QueueTableProps = {
  data: QueueEntry[];
  onStartPatient: (id: string, status: string) => void;
};

export default function QueueTable({ data, onStartPatient }: QueueTableProps) {
  // Define columns for the queue table
  const columns: ColumnDef<QueueEntry>[] = [
    {
      accessorKey: "counter",
      header: "COUNTER",
      cell: ({ row }) => {
        return <div className="font-medium">{row.getValue("counter")}</div>;
      },
    },
    {
      accessorKey: "serialNumber",
      header: "SERIAL NO",
      cell: ({ row }) => {
        return <div className="font-medium">{row.getValue("serialNumber")}</div>;
      },
    },
    {
      accessorKey: "patientName",
      header: "PATIENT NAME",
      cell: ({ row }) => {
        return <div className="font-medium">{row.original.patientName || "N/A"}</div>;
      },
    },
    {
      accessorKey: "gender",
      header: "GENDER",
      cell: ({ row }) => {
        return <div className="text-gray-600">{row.getValue("gender")}</div>;
      },
    },
    {
      accessorKey: "estimatedTime",
      header: "ESTIMATED TIME",
      cell: ({ row }) => {
        return <div className="text-gray-600">{row.getValue("estimatedTime")}</div>;
      },
    },
    {
      accessorKey: "status",
      header: "STATUS",
      cell: ({ row }) => {
        const status = row.original.status || "waiting";
        const getStatusColor = (status: string) => {
          switch (status.toLowerCase()) {
            case "waiting":
              return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
            case "in_progress":
              return "bg-blue-100 text-blue-800 hover:bg-blue-100";
            case "completed":
              return "bg-green-100 text-green-800 hover:bg-green-100";
            case "cancelled":
              return "bg-red-100 text-red-800 hover:bg-red-100";
            default:
              return "bg-gray-100 text-gray-800 hover:bg-gray-100";
          }
        };

        return (
          <Badge className={`${getStatusColor(status)} border-0`}>
            {status.replace("_", " ").toUpperCase()}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => {
        const entry = row.original;
        const status = entry.status?.toLowerCase() || "waiting";
        
        if (!entry.id) return null;
        
        if (status === "waiting") {
          return (
            <Button
              size="sm"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 text-sm"
              onClick={() => onStartPatient(entry.id!, "in_progress")}
            >
              Start
            </Button>
          );
        } else if (status === "in_progress") {
          return (
            <Button
              size="sm"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 text-sm"
              onClick={() => onStartPatient(entry.id!, "completed")}
            >
              Complete
            </Button>
          );
        } else {
          return null;
        }
      },
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={data}
      options={{
        disablePagination: true,
        disableSelection: true,
      }}
    />
  );
}