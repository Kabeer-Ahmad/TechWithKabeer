"use client";

import { motion } from "framer-motion";
import { Card } from "../ui/Card";
import { SectionHeading } from "../ui/SectionHeading";
import { EXPERIENCES } from "@/app/constants";
import { Briefcase, Calendar, MapPin, Award, Sparkles } from "lucide-react";
import { useMemo } from "react";

// Helper function to parse date from period string
const parseDate = (period: string): Date => {
    const match = period.match(/(\w{3,})\s+(\d{4})/);
    if (match) {
        const month = match[1];
        const year = parseInt(match[2]);
        const monthMap: { [key: string]: number } = {
            "Jan": 0, "Feb": 1, "Mar": 2, "Apr": 3, "May": 4, "Jun": 5,
            "Jul": 6, "Aug": 7, "Sep": 8, "Oct": 9, "Nov": 10, "Dec": 11,
            "January": 0, "February": 1, "March": 2, "April": 3, "June": 5,
            "July": 6, "August": 7, "September": 8, "October": 9, "November": 10, "December": 11
        };
        return new Date(year, monthMap[month] || 0, 1);
    }
    return new Date(0);
};

// Helper function to check if period contains "Present"
const isPresent = (period: string): boolean => {
    return period.toLowerCase().includes("present");
};

// Group experiences by company and sort positions within each company
const groupExperiencesByCompany = () => {
    const grouped: { [key: string]: typeof EXPERIENCES } = {};
    
    EXPERIENCES.forEach(exp => {
        if (!grouped[exp.company]) {
            grouped[exp.company] = [];
        }
        grouped[exp.company].push(exp);
    });
    
    // Sort positions within each company by date (most recent first)
    Object.keys(grouped).forEach(company => {
        grouped[company].sort((a, b) => {
            const aIsPresent = isPresent(a.period);
            const bIsPresent = isPresent(b.period);
            
            // Present positions come first
            if (aIsPresent && !bIsPresent) return -1;
            if (!aIsPresent && bIsPresent) return 1;
            if (aIsPresent && bIsPresent) {
                // Both present - sort by start date (most recent first)
                return parseDate(b.period).getTime() - parseDate(a.period).getTime();
            }
            
            // Both past - sort by end date (most recent first)
            return parseDate(b.period).getTime() - parseDate(a.period).getTime();
        });
    });
    
    // Convert to array and sort companies by their most recent position
    const companyGroups = Object.entries(grouped).map(([company, positions]) => ({
        company,
        positions,
        mostRecentDate: isPresent(positions[0].period) 
            ? parseDate(positions[0].period)
            : parseDate(positions[0].period)
    }));
    
    companyGroups.sort((a, b) => {
        const aHasPresent = a.positions.some(p => isPresent(p.period));
        const bHasPresent = b.positions.some(p => isPresent(p.period));
        
        // Companies with present positions come first
        if (aHasPresent && !bHasPresent) return -1;
        if (!aHasPresent && bHasPresent) return 1;
        
        // Both have or don't have present - sort by most recent date
        return b.mostRecentDate.getTime() - a.mostRecentDate.getTime();
    });
    
    return companyGroups;
};

export const Experience = () => {
    const groupedExperiences = useMemo(() => groupExperiencesByCompany(), []);
    
    const totalPositions = EXPERIENCES.length;
    const totalCompanies = groupedExperiences.length;
    const presentPositions = EXPERIENCES.filter(exp => isPresent(exp.period)).length;
    
    return (
        <section id="experience" className="flex flex-col items-center justify-center pb-20 pt-0 relative z-20">
            <div className="w-full max-w-7xl px-4 md:px-10">
                {/* Summary Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
                >
                    <Card className="p-4 text-center group hover:border-purple-500 transition-all cursor-pointer">
                        <motion.div
                            className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 mb-1"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            {totalPositions}
                        </motion.div>
                        <div className="text-gray-400 text-sm">Positions</div>
                    </Card>
                    <Card className="p-4 text-center group hover:border-cyan-500 transition-all cursor-pointer">
                        <motion.div
                            className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500 mb-1"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            {totalCompanies}
                        </motion.div>
                        <div className="text-gray-400 text-sm">Companies</div>
                    </Card>
                    <Card className="p-4 text-center group hover:border-pink-500 transition-all cursor-pointer">
                        <motion.div
                            className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-1"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            {presentPositions}
                        </motion.div>
                        <div className="text-gray-400 text-sm">Current Roles</div>
                    </Card>
                    <Card className="p-4 text-center group hover:border-cyan-500 transition-all cursor-pointer">
                        <motion.div
                            className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-pink-500 mb-1"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            55+
                        </motion.div>
                        <div className="text-gray-400 text-sm">Projects Delivered</div>
                    </Card>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-cyan-500 to-purple-500 opacity-30" />

                    <div className="flex flex-col gap-12 md:gap-20">
                        {groupedExperiences.map((companyGroup, groupIndex) => {
                            const hasMultiplePositions = companyGroup.positions.length > 1;
                            const hasPresentPosition = companyGroup.positions.some(p => isPresent(p.period));
                            
                            // Combine descriptions (use unique descriptions from all positions)
                            const allDescriptions = companyGroup.positions.flatMap(p => p.description);
                            const uniqueDescriptions = Array.from(new Set(allDescriptions));
                            
                            // Combine technologies (unique from all positions)
                            const allTechnologies = companyGroup.positions.flatMap(p => p.technologies || []);
                            const uniqueTechnologies = Array.from(new Set(allTechnologies));
                            
                            // Get overall period (earliest start to latest end or present)
                            const getOverallPeriod = () => {
                                const periods = companyGroup.positions.map(p => p.period);
                                
                                // Extract start dates
                                const startDates = periods.map(p => {
                                    const match = p.match(/(\w{3,})\s+(\d{4})/);
                                    if (match) {
                                        return { month: match[1], year: parseInt(match[2]), date: parseDate(`${match[1]} ${match[2]}`) };
                                    }
                                    return null;
                                }).filter(Boolean) as Array<{ month: string; year: number; date: Date }>;
                                
                                // Extract end dates (handle both – and -)
                                const endDates = periods.map(p => {
                                    if (isPresent(p)) return null;
                                    // Match both em dash (–) and regular dash (-)
                                    const match = p.match(/[–-]\s*(\w{3,})\s+(\d{4})/);
                                    if (match) {
                                        return { month: match[1], year: parseInt(match[2]), date: parseDate(`${match[1]} ${match[2]}`) };
                                    }
                                    return null;
                                }).filter(Boolean) as Array<{ month: string; year: number; date: Date }>;
                                
                                if (startDates.length === 0) return periods[0];
                                
                                // Find earliest start date
                                const earliest = startDates.reduce((earliest, current) => {
                                    return current.date < earliest.date ? current : earliest;
                                });
                                
                                // If any position is present, show "Present"
                                if (hasPresentPosition) {
                                    return `${earliest.month} ${earliest.year} – Present`;
                                }
                                
                                // Find latest end date
                                if (endDates.length > 0) {
                                    const latest = endDates.reduce((latest, current) => {
                                        return current.date > latest.date ? current : latest;
                                    });
                                    return `${earliest.month} ${earliest.year} – ${latest.month} ${latest.year}`;
                                }
                                
                                // Fallback to first period
                                return periods[0];
                            };
                            
                            const combinedExperience = {
                                roles: companyGroup.positions.map(p => ({
                                    role: p.role,
                                    period: p.period
                                })),
                                company: companyGroup.company,
                                period: getOverallPeriod(),
                                description: uniqueDescriptions,
                                technologies: uniqueTechnologies
                            };
                            
                            return (
                                <div key={companyGroup.company} className={`relative flex flex-col md:flex-row gap-8 md:items-center justify-center w-full`}>
                                    {/* Left Side (Card or Date) */}
                                    <div className={`flex-1 w-full ${groupIndex % 2 === 0 ? 'md:text-right pl-16 md:pl-0' : 'md:text-left hidden md:block'}`}>
                                        {groupIndex % 2 === 0 ? (
                                            <motion.div
                                                initial={{ opacity: 0, x: -50 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.5, delay: 0.2 }}
                                            >
                                                <CombinedExperienceCard 
                                                    combinedExp={combinedExperience}
                                                    hasMultiplePositions={hasMultiplePositions}
                                                />
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.5, delay: 0.4 }}
                                                className="hidden md:flex items-center justify-end gap-2"
                                            >
                                                <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-purple-300 font-medium text-sm shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                                                    {combinedExperience.period}
                                                </div>
                                                <div className="h-[2px] w-8 bg-gradient-to-r from-transparent to-purple-500/50" />
                                            </motion.div>
                                        )}
                                    </div>

                                    {/* Center Timeline Node */}
                                    <div className="absolute left-6 md:static md:left-auto top-0 md:top-auto flex items-center justify-center z-10 transform -translate-x-1/2 md:translate-x-0">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            transition={{ duration: 0.4, type: "spring" }}
                                            className={`w-12 h-12 rounded-full bg-[#0a0118] border-2 ${hasPresentPosition ? 'border-cyan-500' : 'border-purple-500'} flex items-center justify-center ${hasPresentPosition ? 'shadow-[0_0_20px_rgba(6,182,212,0.4)]' : 'shadow-[0_0_20px_rgba(168,85,247,0.4)]'} relative group`}
                                        >
                                            {/* Pulsing effect */}
                                            <div className={`absolute inset-0 rounded-full ${hasPresentPosition ? 'bg-cyan-500/20' : 'bg-purple-500/20'} animate-ping opacity-75`} />
                                            <Briefcase size={20} className={`${hasPresentPosition ? 'text-cyan-400' : 'text-purple-400'} group-hover:text-white transition-colors relative z-10`} />
                                        </motion.div>
                                    </div>

                                    {/* Right Side (Date or Card) */}
                                    <div className={`flex-1 w-full ${groupIndex % 2 === 0 ? 'md:text-left hidden md:block' : 'md:text-right pl-16 md:pl-0'}`}>
                                        {groupIndex % 2 === 0 ? (
                                            <motion.div
                                                initial={{ opacity: 0, x: 20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.5, delay: 0.4 }}
                                                className="hidden md:flex items-center justify-start gap-2"
                                            >
                                                <div className="h-[2px] w-8 bg-gradient-to-r from-purple-500/50 to-transparent" />
                                                <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-purple-300 font-medium text-sm shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                                                    {combinedExperience.period}
                                                </div>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                initial={{ opacity: 0, x: 50 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.5, delay: 0.2 }}
                                            >
                                                <CombinedExperienceCard 
                                                    combinedExp={combinedExperience}
                                                    hasMultiplePositions={hasMultiplePositions}
                                                />
                                            </motion.div>
                                        )}
                                    </div>

                                    {/* Mobile Date (visible only on small screens) */}
                                    <div className="md:hidden w-full flex justify-start pl-16 mt-2 mb-4">
                                        <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-purple-300 text-xs font-medium">
                                            {combinedExperience.period}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

const CombinedExperienceCard = ({ 
    combinedExp,
    hasMultiplePositions
}: { 
    combinedExp: {
        roles: Array<{ role: string; period: string }>;
        company: string;
        period: string;
        description: string[];
        technologies: string[];
    };
    hasMultiplePositions: boolean;
}) => {
    const isPresentPosition = combinedExp.period.toLowerCase().includes("present");
    const hasCurrentRoles = combinedExp.roles.some(r => isPresent(r.period));
    
    return (
        <Card className={`border-l-4 ${isPresentPosition ? 'border-l-cyan-500' : 'border-l-purple-500'} p-6 md:p-8 hover:shadow-lg ${isPresentPosition ? 'hover:shadow-cyan-500/10' : 'hover:shadow-purple-500/10'} transition-all duration-300 group hover:-translate-y-1 text-left relative overflow-hidden`}>
            {/* Animated background gradient for current positions */}
            {isPresentPosition && (
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent pointer-events-none" />
            )}
            
            <div className="flex flex-col gap-4 relative z-10">
                {/* Header */}
                <div className="flex flex-col gap-3">
                    {/* Company Name with Current Badge */}
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                        <div className="flex items-center gap-2 text-lg text-purple-400 font-medium">
                            <Briefcase size={16} />
                            <h4>{combinedExp.company}</h4>
                            {hasMultiplePositions && (
                                <span className="ml-2 px-2 py-0.5 rounded-md bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs">
                                    {combinedExp.roles.length} Roles
                                </span>
                            )}
                        </div>
                        {isPresentPosition && (
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-cyan-400/10 border border-cyan-500/40 text-cyan-300 text-xs font-semibold shadow-[0_0_15px_rgba(6,182,212,0.3)] backdrop-blur-sm">
                                <Sparkles size={12} className="text-cyan-400 animate-pulse" />
                                <span>Current</span>
                            </div>
                        )}
                    </div>
                    
                    {/* Roles */}
                    <div className="flex flex-col gap-3">
                        {combinedExp.roles.map((roleData, index) => {
                            const isRoleCurrent = isPresent(roleData.period);
                            return (
                                <div key={index} className={`flex flex-col gap-1.5 ${isRoleCurrent ? 'pb-2 border-b border-cyan-500/20' : ''}`}>
                                    <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                                        {roleData.role}
                                    </h3>
                                    <div className="flex items-center gap-2 text-sm text-gray-400">
                                        <Calendar size={12} />
                                        <span>{roleData.period}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    
                    {/* Overall Period */}
                    <div className="flex items-center gap-2 text-sm text-gray-500 pt-1 border-t border-white/5">
                        <span className="font-medium">Overall Period:</span>
                        <span>{combinedExp.period}</span>
                    </div>
                </div>

                {/* Responsibilities */}
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <Award size={18} className="text-purple-400" />
                        <h5 className="font-semibold text-white">Key Responsibilities</h5>
                    </div>
                    <ul className="space-y-2 mb-4">
                        {combinedExp.description.map((desc: string, i: number) => (
                            <li key={i} className="text-gray-300 flex gap-3 text-sm leading-relaxed">
                                <span className="text-purple-400 mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                                <span>{desc}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Technologies Tags */}
                {combinedExp.technologies && combinedExp.technologies.length > 0 && (
                    <div className="pt-4 border-t border-white/5">
                        <div className="flex flex-wrap gap-2">
                            {combinedExp.technologies.map((tech: string, i: number) => (
                                <span
                                    key={i}
                                    className="px-2 py-1 text-xs rounded-md bg-white/5 text-gray-400 border border-white/10 group-hover:border-purple-500/30 group-hover:text-purple-300 transition-colors"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </Card>
    );
};
