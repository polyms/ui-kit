const orders = [
  {
    id: '#1024',
    name: 'Rhea Levine',
    email: 'rhea.levine@polyms.dev',
    avatar: 'https://www.untitledui.com/images/avatars/rhea-levine',
    company: 'Untitled Labs',
    plan: 'Growth',
    status: 'Paid',
    country: 'US',
    invoiceDate: '2026-05-01',
    amount: '$128.00',
  },
  {
    id: '#1025',
    name: 'Sophia Perez',
    email: 'sophia.perez@polyms.dev',
    avatar: 'https://www.untitledui.com/images/avatars/sophia-perez',
    company: 'Baker Studio',
    plan: 'Pro',
    status: 'Reviewing',
    country: 'AU',
    invoiceDate: '2026-05-02',
    amount: '$64.00',
  },
  {
    id: '#1026',
    name: 'Zara Bush',
    email: 'zara.bush@polyms.dev',
    avatar: 'https://www.untitledui.com/images/avatars/zara-bush',
    company: 'Steiner Works',
    plan: 'Starter',
    status: 'Pending',
    country: 'DE',
    invoiceDate: '2026-05-02',
    amount: '$96.00',
  },
  {
    id: '#1027',
    name: 'Maddison Gillespie',
    email: 'maddison.gillespie@polyms.dev',
    avatar: 'https://www.untitledui.com/images/avatars/maddison-gillespie',
    company: 'Northwind',
    plan: 'Growth',
    status: 'Paid',
    country: 'UK',
    invoiceDate: '2026-05-03',
    amount: '$154.00',
  },
  {
    id: '#1028',
    name: 'Ayah Wilkinson',
    email: 'ayah.wilkinson@polyms.dev',
    avatar: 'https://www.untitledui.com/images/avatars/ayah-wilkinson',
    company: 'Wu Analytics',
    plan: 'Enterprise',
    status: 'Paid',
    country: 'SG',
    invoiceDate: '2026-05-03',
    amount: '$320.00',
  },
]

export default function TableDefault() {
  return (
    <div className='card mx-4 my-auto overflow-x-auto'>
      <table className='table-hover table-striped table rounded-2xl'>
        <thead className='thead-light'>
          <tr>
            <th className='text-nowrap' scope='col'>
              Order
            </th>
            <th className='text-nowrap' scope='col'>
              Customer
            </th>
            <th className='text-nowrap' scope='col'>
              Company
            </th>
            <th className='text-nowrap' scope='col'>
              Plan
            </th>
            <th className='text-nowrap' scope='col'>
              Status
            </th>
            <th className='text-nowrap' scope='col'>
              Country
            </th>
            <th className='text-nowrap' scope='col'>
              Invoice date
            </th>
            <th className='text-nowrap' scope='col'>
              Amount
            </th>
          </tr>
        </thead>
        <tbody className='align-middle'>
          {orders.map(order => (
            <tr className={order.status === 'Reviewing' ? 'table-active' : undefined} key={order.id}>
              <td className='text-nowrap'>{order.id}</td>
              <td className='text-nowrap'>
                <div className='flex items-center gap-3'>
                  <img
                    alt={order.name}
                    className='h-8 w-8 shrink-0 rounded-full object-cover'
                    height={32}
                    loading='lazy'
                    src={order.avatar}
                    width={32}
                  />
                  <div className='leading-tight'>
                    <p className='font-medium'>{order.name}</p>
                    <p className='text-slate-500 text-xs'>{order.email}</p>
                  </div>
                </div>
              </td>
              <td className='text-nowrap'>{order.company}</td>
              <td className='text-nowrap'>{order.plan}</td>
              <td className='text-nowrap'>{order.status}</td>
              <td className='text-nowrap'>{order.country}</td>
              <td className='text-nowrap'>{order.invoiceDate}</td>
              <td className='text-nowrap'>{order.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
