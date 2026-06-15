'use client';

import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import Button from '@/components/ui/Button';

interface TableColumn {
  header: string;
  accessor: string;
  render?: (value: any) => React.ReactNode;
}

interface AdminTableProps {
  columns: TableColumn[];
  data: any[];
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
}

const AdminTable: React.FC<AdminTableProps> = ({ columns, data, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-muted">
            {columns.map((col) => (
              <th key={col.accessor} className="px-4 py-3 text-left font-semibold">
                {col.header}
              </th>
            ))}
            <th className="px-4 py-3 text-left font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="border-b border-border hover:bg-muted/50">
              {columns.map((col) => (
                <td key={col.accessor} className="px-4 py-3">
                  {col.render ? col.render(row[col.accessor]) : row[col.accessor]}
                </td>
              ))}
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(row)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(row)}
                      className="text-destructive hover:text-destructive/80"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;
