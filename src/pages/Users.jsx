import React from 'react';
import { FaUserShield, FaKey, FaPlus, FaUserMinus } from 'react-icons/fa';

export default function Users({ administrators, setAdministrators, logSystemEvent }) {

  // Registers a new administrator console node with assigned privileges
  const handleProvisionOperator = () => {
    const name = prompt("Enter Operator Name:");
    if (!name) return;
    const email = prompt("Enter Operator Corporate Email Endpoint:");
    const role = prompt("Enter Assigned Access Role (e.g., Data Analyst Operator):");
    const node = prompt("Enter Target Routing Node Cluster (e.g., Regional Data Node):");

    const newAdmin = {
      id: Date.now(),
      name,
      email: email || 'operator@cropnexa.com',
      role: role || 'Standard Console Operator',
      node: node || 'General Interface Cluster'
    };

    setAdministrators([...administrators, newAdmin]);
    logSystemEvent('OPERATOR_PROVISIONED', `${name} (${role || 'Standard Console Operator'})`, 'SUCCESS');
  };

  // Revokes active administrative session keys safely
  const handleRevokePrivileges = (id, name) => {
    if (window.confirm(`De-authorize and purge console keys for ${name}? This action revokes session authorization instantly.`)) {
      setAdministrators(administrators.filter(admin => admin.id !== id));
      logSystemEvent('OPERATOR_DEPRIVILEGED', name, 'SUCCESS');
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm space-y-6 animate-fadeIn">
      
      {/* HEADER SECTION CONTROLS MATRIX */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider">Administrative Console Nodes</h3>
          <p className="text-xs text-slate-400">Manage security credentials, restrict admin entry permissions, or rotate node visibility options.</p>
        </div>
        <button 
          onClick={handleProvisionOperator}
          className="px-4 py-2.5 bg-[#15803D] hover:bg-green-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center space-x-2"
        >
          <FaPlus /> <span>Provision New Operator</span>
        </button>
      </div>

      {/* CORE OPERATOR NODES LAYOUT REGISTER */}
      <div className="space-y-4">
        {administrators && administrators.length > 0 ? (
          administrators.map((admin, idx) => (
            <div key={admin.id || idx} className="p-4 border border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/20 rounded-xl flex items-center justify-between flex-wrap gap-4 text-xs font-mono hover:border-slate-200 dark:hover:border-slate-600 transition-colors">
              <div className="flex items-center space-x-3 min-w-0 max-w-full">
                <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-[#15803D] dark:text-green-400 flex-shrink-0">
                  <FaUserShield className="text-base" />
                </div>
                <div className="min-w-0 truncate">
                  <h4 className="font-sans font-bold text-slate-900 dark:text-white text-sm truncate">{admin.name}</h4>
                  <p className="text-slate-400 text-[11px] truncate">
                    {admin.email} • <span className="text-slate-500 dark:text-slate-400 font-bold">{admin.node}</span>
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 font-sans flex-shrink-0">
                <span className="text-[10px] font-black bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded tracking-wider uppercase max-w-[150px] truncate">
                  {admin.role}
                </span>
                <button 
                  onClick={() => {
                    logSystemEvent('SECURITY_KEY_DISPATCH', admin.email, 'SUCCESS');
                    alert(`Password modification key link dispatched to corporate register endpoint: ${admin.email}`);
                  }} 
                  className="p-2 bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg border border-slate-100 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors inline-flex" 
                  title="Dispatch Reset Key"
                >
                  <FaKey className="text-xs" />
                </button>
                <button 
                  onClick={() => handleRevokePrivileges(admin.id, admin.name)}
                  className="p-2 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/60 transition-colors inline-flex"
                  title="Revoke Node Access"
                >
                  <FaUserMinus className="text-xs" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-slate-400 italic font-sans">
            No administrative operators are registered onto the console engine.
          </div>
        )}
      </div>
    </div>
  );
}