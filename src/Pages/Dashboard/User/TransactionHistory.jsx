import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const TransactionHistory = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading: paymentsLoading } = useQuery({
    queryKey: ["transactionHistory", user?.email],
    enabled: !authLoading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  if (authLoading || paymentsLoading) {
    return (
      <div className="text-center p-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">
        Transaction History ({payments.length})
      </h2>

      <div className="overflow-x-auto shadow-xl rounded-lg">
        <table className="table w-full">
          <thead className="bg-primary text-white">
            <tr>
              <th>#</th>
              <th>Ticket Status</th>
              <th>Amount Paid</th>
              <th>Transaction ID</th>
              <th>Payment Date</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id}>
                <th>{index + 1}</th>
                <td>{payment.status}</td>
                <td className="font-bold">
                  ${parseFloat(payment.price).toFixed(2)}
                </td>
                <td className="font-mono text-xs text-success">
                  {payment.transactionId}
                </td>
                <td>{new Date(payment.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {payments.length === 0 && (
        <p className="text-center text-xl mt-10 text-gray-500">
          No transaction history found.
        </p>
      )}
    </div>
  );
};

export default TransactionHistory;
