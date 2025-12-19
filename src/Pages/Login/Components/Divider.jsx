import React from 'react';

const Divider = () => {
    return (
        <div>
            <div className="relative my-8">
                        <div
                            className="absolute inset-0 flex items-center"
                            aria-hidden="true"
                        >
                            <div className="w-full border-t border-border"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span
                                className="px-4 bg-card text-muted-foreground font-medium"
                                >Or continue with</span
                            >
                        </div>
                    </div>
        </div>
    );
};

export default Divider;