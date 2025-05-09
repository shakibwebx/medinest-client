'use client';

import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { useGetAllOrderQuery } from '@/redux/features/orders/orderApi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { BarChart3, PackageCheck, ClipboardList } from 'lucide-react';
import Spinner from '@/components/shared/Spinner';

const THEME_COLORS = {
  text: '#1d1115',
  background: '#f5f5f5',
  primary: '#0A9C71',
  secondary: '#33e198',
  accent: '#41be86',
};

export default function AdminDashboard() {
  const { data: order = [], isLoading } = useGetAllOrderQuery({});
  const orderData = order?.data;

  const [stockData, setStockData] = useState({ totalStock: 0, lowStockItems: 0 });
  const [prescriptionData, setPrescriptionData] = useState({ pendingPrescriptions: 0, reviewRequired: 0 });

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/stocks`);
        const data = await res.json();
        setStockData(data);
      } catch (err) {
        console.error('Failed to fetch stock data:', err);
      }
    };

    const fetchPrescriptionData = async () => {
      try {
        const res = await fetch('/api/prescriptions');
        const data = await res.json();
        setPrescriptionData({
          pendingPrescriptions: data.pendingPrescriptions,
          reviewRequired: data.reviewRequired,
        });
      } catch (err) {
        console.error('Failed to fetch prescription data:', err);
      }
    };

    fetchStockData();
    fetchPrescriptionData();
    const interval = setInterval(() => {
      fetchStockData();
      fetchPrescriptionData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const barChartData =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    orderData?.map((order: any) => ({
      name: new Date(order.createdAt).toLocaleDateString(),
      total: order.totalAmount,
    })) || [];

  const pieChartData = [
    { name: 'Pending', value: prescriptionData.pendingPrescriptions },
    { name: 'Review Required', value: prescriptionData.reviewRequired },
  ];

  const PIE_COLORS = [THEME_COLORS.primary, THEME_COLORS.secondary];

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="space-y-6 p-6" style={{ backgroundColor: THEME_COLORS.background, color: THEME_COLORS.text }}>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card style={{ backgroundColor: '#fff', color: THEME_COLORS.text }}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ClipboardList className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orderData?.length}</div>
            <p className="text-xs text-muted-foreground">All-time total</p>
          </CardContent>
        </Card>

        <Card style={{ backgroundColor: '#fff', color: THEME_COLORS.text }}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Stock Levels</CardTitle>
            <PackageCheck className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stockData.totalStock} Items</div>
            <p className="text-xs text-muted-foreground">
              {stockData.lowStockItems} low-stock items
            </p>
          </CardContent>
        </Card>

        <Card style={{ backgroundColor: '#fff', color: THEME_COLORS.text }}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Prescriptions</CardTitle>
            <BarChart3 className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{prescriptionData.pendingPrescriptions}</div>
            <p className="text-xs text-muted-foreground">
              {prescriptionData.reviewRequired} review required
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Order Totals by Date</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barChartData}>
                <XAxis dataKey="name" stroke={THEME_COLORS.text} />
                <YAxis stroke={THEME_COLORS.text} />
                <Tooltip />
                <Bar dataKey="total" fill={THEME_COLORS.primary} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Prescription Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill={THEME_COLORS.primary}
                  dataKey="value"
                  label
                >
                  {pieChartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderData?.slice(0, 5).map((order: { _id: string; user: { name: string }; createdAt: string; totalAmount: number; status: string }) => (
                <TableRow key={order._id}>
                  <TableCell>{order?.user?.name || 'Guest'}</TableCell>
                  <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>${order.totalAmount}</TableCell>
                  <TableCell className="capitalize">{order.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
