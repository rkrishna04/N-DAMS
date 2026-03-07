import React, { useState, useEffect } from 'react';

const RootDashboard = () => {
  // --- STATE MANAGEMENT (Frontend Logic Layer) ---
  const [backups, setBackups] = useState([
    { id: 'sha256:7f8d...a21b', timestamp: '2023-11-20 04:00:01', status: 'Success', size: '42.8 GB' },
    { id: 'sha256:3a1c...eef9', timestamp: '2023-11-19 04:00:01', status: 'Success', size: '42.7 GB' },
  ]);

  const [saAccounts, setSaAccounts] = useState([
    { id: 1, name: 'j.dawson_admin', initial: 'JD', status: 'Active 5m ago', active: true },
    { id: 2, name: 'm.knight_root', initial: 'MK', status: 'Active 2h ago', active: true },
    { id: 3, name: 's.lee_admin', initial: 'SL', status: 'Access Revoked', active: false },
  ]);

  const [alerts, setAlerts] = useState([
    { id: 1, type: 'Critical', title: 'Unusual SSH login attempt', meta: 'Source IP: 192.168.1.104', time: '2m ago', color: 'red' },
    { id: 2, type: 'Warning', title: 'DB Connection Timeout', meta: 'Instance: prod-db-01', time: '15m ago', color: 'gold' },
  ]);

  const [backupFreq, setBackupFreq] = useState('Daily');

  // --- WORKFLOW 7: BACKUP MANAGEMENT ---
  const runManualBackup = () => {
    const newBackup = {
      id: `sha256:${Math.random().toString(16).slice(2, 6)}...${Math.random().toString(16).slice(2, 6)}`,
      timestamp: new Date().toLocaleString(),
      status: 'Success',
      size: '43.1 GB'
    };
    // Reflect change immediately in the table [cite: 104, 125]
    setBackups([newBackup, ...backups]);
    alert("Manual Backup initiated and verified successfully[cite: 94].");
  };

  // --- WORKFLOW 6: REVOKE PERMISSION ---
  const toggleAccountStatus = (id) => {
    setSaAccounts(prev => prev.map(acc => {
      if (acc.id === id) {
        const newStatus = !acc.active;
        // Log action in console to simulate Audit Log creation [cite: 113, 135]
        console.log(`Audit: ${acc.name} status changed to ${newStatus ? 'Active' : 'Revoked'}`);
        return { ...acc, active: newStatus, status: newStatus ? 'Active now' : 'Access Revoked' };
      }
      return acc;
    }));
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#1a1e23] text-[#e9f0f1] font-sans">
      {/* SIDE NAVIGATION [cite: 18, 20] */}
      <aside className="w-64 border-r border-[#2b313a] flex flex-col bg-[#1a1e23]">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-8 w-8 bg-[#1a535b] rounded-lg flex items-center justify-center text-white font-bold">R</div>
            <div>
              <h1 className="text-lg font-bold leading-tight">System Root</h1>
              <p className="text-xs text-[#5a868c]">v4.2.0-stable</p>
            </div>
          </div>
          <nav className="space-y-1">
            {['Overview', 'System Backup', 'Identity Management', 'Security Alerts'].map((item, idx) => (
              <a key={item} href="#" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${idx === 0 ? 'bg-[#1a535b]/10 text-[#e9f0f1] border-l-4 border-[#1a535b]' : 'text-[#5a868c] hover:bg-[#2b313a]'}`}>
                <span className="text-sm">{item}</span>
              </a>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4 border-t border-[#2b313a]">
          <button className="w-full py-3 bg-[#D85B42] text-white text-xs font-bold rounded-lg uppercase tracking-widest hover:bg-[#D85B42]/90">
            Emergency Lock
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT [cite: 18, 130] */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-[#2b313a] flex items-center justify-between px-8 bg-[#1a1e23]">
          <div className="flex items-center gap-4 text-xs font-mono">
             <span className="text-[#5a868c]">Path:</span> root / security / dashboard
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-[#078834]">
              <div className="h-2 w-2 rounded-full bg-[#078834] animate-pulse"></div>
              <span className="text-[10px] font-bold uppercase">System Pulse: Nominal [cite: 90]</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-bold">Root_User</p>
                <p className="text-[10px] text-[#1a535b] uppercase font-bold">Superuser [cite: 1, 11]</p>
              </div>
              <div className="h-10 w-10 rounded-full border-2 border-[#1a535b] bg-gray-700"></div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {/* STATS ROW [cite: 19] */}
          <div className="grid grid-cols-4 gap-6">
            <div className="bg-[#24292f] p-6 rounded-xl border border-[#3a414b]">
              <p className="text-xs text-[#5a868c] uppercase font-bold">Total Backups</p>
              <p className="text-3xl font-black mt-1">{backups.length + 246}</p>
            </div>
            <div className="bg-[#24292f] p-6 rounded-xl border border-[#3a414b]">
              <p className="text-xs text-[#5a868c] uppercase font-bold">System Health</p>
              <p className="text-3xl font-black mt-1">99%</p>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-8">
            {/* BACKUP SCHEDULER [cite: 81, 92] */}
            <section className="col-span-8 bg-[#24292f] rounded-xl border border-[#3a414b]">
              <div className="px-6 py-4 border-b border-[#3a414b] flex justify-between items-center">
                <h2 className="text-lg font-bold">Backup Scheduler</h2>
                <button onClick={runManualBackup} className="px-4 py-2 bg-[#1a535b] text-white text-xs font-bold rounded-lg uppercase">
                  Run Manual Backup [cite: 83]
                </button>
              </div>
              <div className="p-6">
                <div className="flex h-12 bg-[#1a1e23] p-1 rounded-xl mb-6">
                  {['Daily', 'Weekly', 'Monthly'].map(freq => (
                    <button key={freq} onClick={() => setBackupFreq(freq)} className={`flex-1 rounded-lg text-xs font-bold uppercase ${backupFreq === freq ? 'bg-[#3a414b] text-white' : 'text-[#5a868c]'}`}>
                      {freq}
                    </button>
                  ))}
                </div>
                <table className="w-full text-left text-sm">
                  <thead className="text-[10px] uppercase text-[#5a868c] bg-[#1a1e23]/30">
                    <tr><th className="px-6 py-3">Timestamp</th><th className="px-6 py-3">Status</th><th className="px-6 py-3 text-right">Action</th></tr>
                  </thead>
                  <tbody className="divide-y divide-[#3a414b]">
                    {backups.map((b, i) => (
                      <tr key={i} className="hover:bg-[#3a414b]/20">
                        <td className="px-6 py-4 font-mono text-xs">{b.timestamp}</td>
                        <td className="px-6 py-4 text-[#078834] font-semibold">{b.status}</td>
                        <td className="px-6 py-4 text-right"><button className="text-[#1a535b] font-bold hover:underline">Restore</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECURITY FEED & SA MANAGEMENT [cite: 12, 110] */}
            <div className="col-span-4 space-y-8">
              <section className="bg-[#24292f] rounded-xl border border-[#3a414b] h-[300px] flex flex-col">
                <div className="px-6 py-4 border-b border-[#3a414b] font-bold text-sm">Security Feed [cite: 6]</div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {alerts.map(a => (
                    <div key={a.id} className={`p-3 border rounded-lg bg-${a.color}-500/10 border-${a.color}-500/20`}>
                      <div className="flex justify-between text-[10px] uppercase font-bold mb-1">
                        <span style={{ color: a.color === 'gold' ? '#C8AA6E' : '#D85B42' }}>{a.type}</span>
                        <span className="text-[#5a868c]">{a.time}</span>
                      </div>
                      <p className="text-xs font-bold">{a.title}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-[#24292f] rounded-xl border border-[#3a414b]">
                <div className="px-6 py-4 border-b border-[#3a414b] font-bold text-sm">SA Accounts [cite: 12, 67]</div>
                <div className="p-4 space-y-4">
                  {saAccounts.map(acc => (
                    <div key={acc.id} className="flex items-center justify-between p-3 border border-[#3a414b] rounded-lg bg-[#2b313a]">
                      <div className={`flex items-center gap-3 ${!acc.active && 'opacity-50'}`}>
                        <div className="h-8 w-8 rounded-full bg-[#1a535b]/20 flex items-center justify-center text-[#1a535b] text-xs font-bold">{acc.initial}</div>
                        <div>
                          <p className={`text-xs font-bold ${!acc.active && 'line-through'}`}>{acc.name}</p>
                          <p className="text-[10px] text-[#5a868c]">{acc.status}</p>
                        </div>
                      </div>
                      <button onClick={() => toggleAccountStatus(acc.id)} className={`text-[10px] font-bold uppercase hover:underline ${acc.active ? 'text-[#D85B42]' : 'text-[#1a535b]'}`}>
                        {acc.active ? 'Revoke' : 'Restore'} [cite: 76, 106]
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RootDashboard;
