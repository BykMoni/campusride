import React from 'react'
// 🌟 Imported the matching search and notification icons from the package
import { Search, Bell } from 'lucide-react'

export default function TopHeader({ activePage = 'dashboard' }) {
  return (
    <header style={headerStyles.header}>
      <div style={headerStyles.leftContainer}>
        <h2 style={headerStyles.title}>
          {activePage === 'dashboard' ? 'Dashboard' : activePage.replace('-', ' ')}
        </h2>
        
        <div style={headerStyles.searchBar}>
          {/* Package Search Icon */}
          <Search size={14} strokeWidth={2.5} color="#94A3B8" />
          <input 
            type="text" 
            placeholder="Search trips, drivers, students..." 
            style={headerStyles.input} 
          />
        </div>
      </div>
      
      <div style={headerStyles.rightContainer}>
        <div style={headerStyles.dateBlock}>
          <p style={headerStyles.dateLabel}>TODAY'S DATE</p>
          <p style={headerStyles.dateValue}>October 24, 2023 • 14:45</p>
        </div>
        
        <button style={headerStyles.bellButton}>
          {/* Package Bell Icon */}
          <Bell size={16} strokeWidth={2.5} color="#64748B" />
        </button>
      </div>
    </header>
  )
}

// ── CLEAN ARRANGED STYLE SHEET ──────────────────────────────────────────────
const headerStyles = {
  /* Main Container Shell */
  header: { 
    height: '64px', 
    backgroundColor: '#ffffff', 
    borderBottom: '1px solid #E2E8F0', 
    padding: '0 32px', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    flexShrink: 0 
  },

  /* Left Panel Tools */
  leftContainer: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '24px' 
  },
  title: { 
    fontSize: '18px', 
    fontWeight: 800, 
    color: '#1E293B', 
    textTransform: 'capitalize', 
    fontFamily: 'Inter, sans-serif', 
    margin: 0 
  },
  searchBar: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '12px', 
    backgroundColor: '#F8FAFC', 
    padding: '8px 14px', 
    borderRadius: '12px', 
    border: '1px solid #E2E8F0', 
    width: '320px' 
  },
  input: { 
    background: 'transparent', 
    border: 'none', 
    outline: 'none', 
    fontSize: '12px', 
    color: '#334155', 
    width: '100%', 
    fontFamily: 'Inter, sans-serif' 
  },

  /* Right Panel Actions */
  rightContainer: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '16px' 
  },
  dateBlock: { 
    textAlign: 'right' 
  },
  dateLabel: { 
    fontSize: '9px', 
    fontWeight: 800, 
    color: '#94A3B8', 
    letterSpacing: '1px', 
    margin: 0, 
    fontFamily: 'Inter, sans-serif' 
  },
  dateValue: { 
    fontSize: '12px', 
    fontWeight: 700, 
    color: '#334155', 
    margin: '2px 0 0 0', 
    fontFamily: 'Inter, sans-serif' 
  },
  bellButton: { 
    height: '32px', 
    width: '32px', 
    borderRadius: '12px', 
    backgroundColor: '#F8FAFC', 
    border: '1px solid #E2E8F0', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    cursor: 'pointer' 
  }
}