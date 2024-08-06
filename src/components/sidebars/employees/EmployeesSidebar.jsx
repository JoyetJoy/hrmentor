import React from 'react'
import { Link } from 'react-router-dom'

function EmployeesSidebar() {
  return (
    <div className="bg-white rounded-b-md ">
                    
                    <ul className='flex flex-col items-baseline gap-3'>
                   <Link>Primary Information</Link>
                   <Link>Work Information</Link>
                   <Link>Skills/Qulification</Link>
                   <Link>Experience </Link>
                   <Link>Registration&Membership</Link>
                   <Link>Right to work</Link>
                   <Link>Emeergency contacts</Link>
                   <Link>Bank Details</Link>
                   <Link>Compensation</Link>
                   <Link>Documents</Link>
                   <Link>payslip</Link>

                    </ul>
                </div>
  )
}

export default EmployeesSidebar
